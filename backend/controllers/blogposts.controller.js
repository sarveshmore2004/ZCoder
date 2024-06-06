import BlogPost from "../models/blogpost.model.js";
import Comment from "../models/comment.model.js";
import User from "../models/user.model.js";

// Create a new blog post
export const createBlogPost = async (req, res) => {
  try {
    const { title, author, problemLink, tags, content, visibility } = req.body;
    const newBlogPost = new BlogPost({ title, author, problemLink, tags, content, visibility });

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
  const { sort } = req.query;
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
    const blogPosts = await BlogPost.find({visibility:{$eq:true}}).populate("author").sort(sortOption);
    res.status(200).json(blogPosts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a blog post by ID
export const getBlogPostById = async (req, res) => {
  try {
    const blogPost = await BlogPost.findById(req.params.id)
      .populate("author", "name clerkId")
      .populate({
        path: 'comments',
        populate: {
          path: 'author'
        }
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
    const { title, problemLink, tags, content, visibility } = req.body;
    const blogPost = await BlogPost.findById(req.params.id);
    if (!blogPost) {
      return res.status(404).json({ message: "Blog post not found" });
    }

    blogPost.title = title;
    blogPost.problemLink = problemLink;
    blogPost.tags = tags;
    blogPost.content = content;
    blogPost.visibility = visibility;

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
    const { content, author } = req.body;
    const blogPost = await BlogPost.findById(req.params.id);
    if (!blogPost) {
      return res.status(404).json({ message: "Blog post not found" });
    }

    const postId = req.params.id;
    const newComment = new Comment({ content, author, postId });

    if (!newComment) {
      return res.status(404).json({ error: "Invalid comment data, can't create comment" });
    }

    const savedComment = await newComment.save();

    blogPost.comments.push(savedComment._id);
    blogPost.commentsCount += 1;
    await blogPost.save();

    // Update user's comments count and recent activity
    const user = await User.findById(author);
    if (user) {
      user.comments += 1;
      user.recentActivity.comments.push(savedComment._id);
      await user.save();
    }

    res.status(201).json(savedComment);
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
