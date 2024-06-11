import BlogPost from "../models/blogpost.model.js";
import Comment from "../models/comment.model.js";
import User from "../models/user.model.js";
import { addNotification } from "./users.controller.js";

// Create a new blog post
export const createBlogPost = async (req, res) => {
  try {
    const { title, author, problemLink, tags, content, visibility , platform} = req.body;
    const newBlogPost = new BlogPost({ title, author, problemLink, tags, content, visibility , platform});

    if (!newBlogPost) {
      return res.status(404).json({ error: "Invalid blog data, can't create blog" });
    }

    const savedBlogPost = await newBlogPost.save();

    // Update user's bookmarks count and recent activity
    const user = await User.findById(author);

    if (user) {
      user.bookmarks += 1;
      user.recentActivity.posts.push(savedBlogPost._id);
      await user.save();
    }

    res.status(201).json(savedBlogPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all blog posts
export const getAllBlogPosts = async (req, res) => {
  const { sort, page = 1, limit = 10, tags = '', platform = '', problemLink = '' } = req.query;
  let sortOption;

  switch (sort) {
    case "recent":
      sortOption = { date: -1 };
      break;
    case "oldest":
      sortOption = { date: 1 };
      break;
    case "popularity":
      sortOption = { upvotes: -1 };
      break;
    case "views":
      sortOption = { views: -1 };
      break;
    default:
      sortOption = { date: -1 };
  }

  const tagArray = tags.split(',').filter(tag => tag); // Convert tags query to an array
  const skip = (page - 1) * limit; // Calculate the number of documents to skip

  const filter = {
    visibility: true,
    ...(tagArray.length > 0 && { tags: { $all: tagArray } }), // Filter by tags if provided
    ...(platform && { platform: new RegExp(platform, 'i') }), // Filter by platform if provided
    ...(problemLink && { problemLink: new RegExp(problemLink, 'i') }) // Filter by problem link if provided
  };

  try {
    const blogPosts = await BlogPost.find(filter)
      .populate("author")
      .sort(sortOption)
      .skip(skip)
      .limit(parseInt(limit));

    const totalPosts = await BlogPost.countDocuments(filter);
    const totalPages = Math.ceil(totalPosts / limit);

    res.status(200).json({ blogPosts, totalPages });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Get a blog post by ID
export const getBlogPostById = async (req, res) => {
  const { sort = "recent" } = req.query;
  let sortOption;

  switch (sort) {
    case "recent":
      sortOption = { date: -1 };
      break;
    case "oldest":
      sortOption = { date: 1 };
      break;
    case "popularity":
      sortOption = { upvotes: -1 };
      break;
    default:
      sortOption = { date: -1 };
  }

  try {
    const blogPost = await BlogPost.findById(req.params.id)
      .populate("author", "name clerkId")
      .populate({
        path: 'comments',
        options: { sort: sortOption },
        populate: [
          { path: 'author', select: 'name clerkId' },
          {
            path: 'replies',
            populate: { path: 'author', select: 'name clerkId' }
          }
        ]
      });

    if (!blogPost) {
      return res.status(404).json({ message: "Blog post not found" });
    }
    res.status(200).json(blogPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a blog post
export const updateBlogPost = async (req, res) => {
  try {
    const { title, problemLink, tags, content, visibility ,platform} = req.body;
    const blogPost = await BlogPost.findById(req.params.id);
    if (!blogPost) {
      return res.status(404).json({ message: "Blog post not found" });
    }

    blogPost.title = title;
    blogPost.problemLink = problemLink;
    blogPost.tags = tags;
    blogPost.content = content;
    blogPost.visibility = visibility;
    blogPost.platform = platform;

    const updatedBlogPost = await blogPost.save();
    res.status(200).json(updatedBlogPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a blog post
export const deleteBlogPost = async (req, res) => {
  try {
    const blogPost = await BlogPost.findById(req.params.id);
    if (!blogPost) {
      return res.status(404).json({ message: "Blog post not found" });
    }
    const author = blogPost.author;
    await blogPost.deleteOne({ _id: req.params.id });
    const user = await User.findById(author);
    if (user) {
      user.bookmarks -= 1;
      await user.save();
    }
    res.status(200).json({ message: "Blog post deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a comment to a blog post
export const addCommentToBlogPost = async (req, res) => {
  try {
    const { content, author, parentId , replyingToId } = req.body;
    const blogPostId = req.params.id;

    let parentComment;
    if (parentId) {
      parentComment = await Comment.findById(parentId);
      if (!parentComment) {
        return res.status(404).json({ message: "Parent comment not found" });
      }
    }
    let replyingComment;
    if (replyingToId) {
      replyingComment = await Comment.findById(replyingToId);
      if (!replyingComment) {
        return res.status(404).json({ message: "Replying comment not found" });
      }
    }

    const newComment = new Comment({
      content,
      author,
      postId: blogPostId,
      parentId: parentComment ? parentComment._id : blogPostId,
    });

    const savedComment = await newComment.save();
    const blogPost = await BlogPost.findById(blogPostId);

    if (parentComment) {
      parentComment.replies.push(savedComment._id);
      blogPost.commentsCount += 1;
      
      // If it's a reply, notify the original commenter
      if (parentComment && parentComment.author.toString() !== author) {
        await addNotification(parentComment.author, savedComment._id);
      }

      if (replyingComment && replyingComment.author.toString() !== author) {
        await addNotification(replyingComment.author, savedComment._id);
      }
      
      await Promise.all([parentComment.save(), blogPost.save()]);
    } else {
      blogPost.comments.push(savedComment._id);
      blogPost.commentsCount += 1;
      // Notify the blog post author about the new comment
      if (blogPost.author.toString() !== author) {
        await addNotification(blogPost.author, savedComment._id);
        }
      await blogPost.save();
    }

    // Update user's comments count and recent activity
    const user = await User.findById(author);
    if (user) {
      user.comments += 1;
      user.recentActivity.comments.push(savedComment._id);
      await user.save();
    }

    const newSavedComment = await savedComment.populate('author');
    res.status(201).json(newSavedComment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// Upvote a blog post
export const upvoteBlogPost = async (req, res) => {
  try {
    const { userId } = req.body;
    const blogPost = await BlogPost.findById(req.params.id);
    if (!blogPost) {
      return res.status(404).json({ message: "Blog post not found" });
    }

    if (!blogPost.upvotes.includes(userId)) {
      blogPost.upvotes.push(userId);
    }
    if (blogPost.downvotes.includes(userId)) {
      blogPost.downvotes = blogPost.downvotes.filter(id => id.toString() !== userId);
    }

    const updatedBlogPost = await blogPost.save();
    res.status(200).json(updatedBlogPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Downvote a blog post
export const downvoteBlogPost = async (req, res) => {
  try {
    const { userId } = req.body;
    const blogPost = await BlogPost.findById(req.params.id);
    if (!blogPost) {
      return res.status(404).json({ message: "Blog post not found" });
    }

    if (!blogPost.downvotes.includes(userId)) {
      blogPost.downvotes.push(userId);
    }
    if (blogPost.upvotes.includes(userId)) {
      blogPost.upvotes = blogPost.upvotes.filter(id => id.toString() !== userId);
    }

    const updatedBlogPost = await blogPost.save();
    res.status(200).json(updatedBlogPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Incrementing views
export const incrementViews = async (req, res) => {
  try {
    const { userId } = req.body;

    // Use $addToSet to ensure the userId is only added if it's not already present
    const updatedBlogPost = await BlogPost.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { views: userId } },
      { new: true }
    );

    if (!updatedBlogPost) {
      return res.status(404).json({ message: "Blog post not found" });
    }

    res.status(200).json(updatedBlogPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Favorite a blog post
export const favoriteBlogPost = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.favorites.includes(req.params.id)) {
      user.favorites.push(req.params.id);
      await user.save();
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Unfavorite a blog post
export const unfavoriteBlogPost = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.favorites = user.favorites.filter(id => id.toString() !== req.params.id);
    await user.save();

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};