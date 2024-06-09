import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { FiMessageCircle, FiBookmark } from "react-icons/fi";
import { IoArrowBack } from "react-icons/io5";
import { FaEdit, FaEye } from "react-icons/fa";
import { MdThumbUp, MdThumbDown } from "react-icons/md";
import Header from "../components/Header";
import useFetchBlogPostbyId from "../hooks/useFetchBlogPostbyId";
import useAddCommentToBlogPost from "../hooks/useAddCommentToBlogPost";
import useUpvoteBlogPost from "../hooks/useUpvoteBlogPost";
import useDownvoteBlogPost from "../hooks/useDownvoteBlogPost";
import useUpvoteComment from "../hooks/useUpvoteComment";
import useDownvoteComment from "../hooks/useDownvoteComment";
import { useAuth } from "@clerk/clerk-react";
import useFetchUserById from "../hooks/useFetchUserById";
import useIncrementBlogPostView from "../hooks/useIncrementBlogPostView";
import useFavoriteBlogPost from "../hooks/useFavoriteBlogPost";
import useUnfavoriteBlogPost from "../hooks/useUnfavoriteBlogPost";
import formatDate from "../utils/formatDate";
import Spinner from "../components/spinner";

const BlogDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [sortMethod, setSortMethod] = useState("recent");

  const { blogPost, loading: postLoading } = useFetchBlogPostbyId(id, sortMethod);
  const { addComment } = useAddCommentToBlogPost(id);
  const { upvote } = useUpvoteBlogPost(id);
  const { downvote } = useDownvoteBlogPost(id);
  const { incrementView } = useIncrementBlogPostView(id);
  const { favorite } = useFavoriteBlogPost(id);
  const { unfavorite } = useUnfavoriteBlogPost(id);
  const { upvoteComment } = useUpvoteComment(id);
  const { downvoteComment } = useDownvoteComment(id);
  const [commentContent, setCommentContent] = useState("");
  const [replyContent, setReplyContent] = useState("");
  const [replyingTo, setReplyingTo] = useState(null);
  const { userId, isLoaded: authLoaded } = useAuth();
  const { user, loading: userLoading } = useFetchUserById(userId);
  const [comments, setComments] = useState([]);
  const [upvoteCount, setUpvoteCount] = useState(0);
  const [downvoteCount, setDownvoteCount] = useState(0);
  const [viewCount, setViewCount] = useState(0);
  const [hasViewed, setHasViewed] = useState(true);
  const [hasUpvoted, setHasUpvoted] = useState(false);
  const [hasDownvoted, setHasDownvoted] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showReplies, setShowReplies] = useState({});

  useEffect(() => {
    if (!postLoading && blogPost) {
      if (!blogPost.visibility && blogPost.author.clerkId !== userId) {
        setTimeout(() => navigate('/dashboard'), 2000); // Redirect after 2 seconds
      }
      setComments(blogPost.comments);
      setViewCount(blogPost.views.length);
      setUpvoteCount(blogPost.upvotes.length);
      setDownvoteCount(blogPost.downvotes.length);
      if (!userLoading && user) {
        setHasViewed(blogPost.views.includes(user._id));
        if (!hasViewed) {
          incrementView(user._id).then(() => {
            setHasViewed(true);
            setViewCount(viewCount + 1);
          });
        }
        setIsFavorite(user.favorites.some((favPost) => favPost._id === id));
        setHasUpvoted(blogPost.upvotes.includes(user._id));
        setHasDownvoted(blogPost.downvotes.includes(user._id));
      }
    }
  }, [userLoading, user, blogPost, postLoading]);

  if (postLoading || userLoading) {
    return <Spinner />;
  }

  if (!blogPost.visibility && blogPost.author.clerkId !== userId) {
    return (
      <div className="bg-primary text-primary_text p-4 rounded mb-6">
        Unauthorized access! Redirecting to the Dashboard...
      </div>
    );
  }

  if (blogPost?.message) {
    return <div>Blog post not found.</div>;
  }

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (user && user._id) {
      const newComment = await addComment(commentContent, user._id);
      if (newComment) {
        setComments([...comments, newComment]);
      }
      setCommentContent("");
    }
  };

  const handleReplySubmit = async (e, parentId) => {
    e.preventDefault();
    if (user && user._id && parentId) {
      const newReply = await addComment(replyContent, user._id, parentId);
      if (newReply) {
        setComments(
          comments.map((comment) => {
            if (comment._id === parentId) {
              return { ...comment, replies: [...comment.replies, newReply] };
            }
            return comment;
          })
        );
        setReplyingTo(null);
        setReplyContent("");
      }
    }
  };

  const handleUpvote = async () => {
    if (user && user._id && !hasUpvoted) {
      await upvote(user._id);
      setUpvoteCount(upvoteCount + 1);
      setHasUpvoted(true);
      if (hasDownvoted) {
        setDownvoteCount(downvoteCount - 1);
        setHasDownvoted(false);
      }
    }
  };

  const handleDownvote = async () => {
    if (user && user._id && !hasDownvoted) {
      await downvote(user._id);
      setDownvoteCount(downvoteCount + 1);
      setHasDownvoted(true);
      if (hasUpvoted) {
        setUpvoteCount(upvoteCount - 1);
        setHasUpvoted(false);
      }
    }
  };

  const handleFavorite = async () => {
    if (user && user._id && !isFavorite) {
      await favorite(user._id);
      setIsFavorite(true);
    }
  };

  const handleUnfavorite = async () => {
    if (user && user._id && isFavorite) {
      await unfavorite(user._id);
      setIsFavorite(false);
    }
  };

  const handleReplyClick = (comment) => {
    setReplyingTo(comment._id);
    setReplyContent(`@${comment.author.name} `);
  };

  const handleCommentUpvote = async (commentId, parentId, hasUpvoted) => {
    if (user && user._id && !hasUpvoted) {
      await upvoteComment(commentId, user._id);
      setComments(
        comments.map((comment) => {
          if (comment._id === commentId) {
            return {
              ...comment,
              upvotes: [...comment.upvotes, user._id],
              downvotes: comment.downvotes.filter((id) => id !== user._id),
            };
          } else if (comment._id === parentId) {
            return {
              ...comment,
              replies: comment.replies.map((reply) => {
                if (reply._id === commentId) {
                  return {
                    ...reply,
                    upvotes: [...reply.upvotes, user._id],
                    downvotes: reply.downvotes.filter((id) => id !== user._id),
                  };
                }
                return reply;
              }),
            };
          }
          return comment;
        })
      );
    }
  };

  const handleCommentDownvote = async (commentId, parentId, hasDownvoted) => {
    if (user && user._id && !hasDownvoted) {
      await downvoteComment(commentId, user._id);
      setComments(
        comments.map((comment) => {
          if (comment._id === commentId) {
            return {
              ...comment,
              downvotes: [...comment.downvotes, user._id],
              upvotes: comment.upvotes.filter((id) => id !== user._id),
            };
          } else if (comment._id === parentId) {
            return {
              ...comment,
              replies: comment.replies.map((reply) => {
                if (reply._id === commentId) {
                  return {
                    ...reply,
                    downvotes: [...reply.downvotes, user._id],
                    upvotes: reply.upvotes.filter((id) => id !== user._id),
                  };
                }
                return reply;
              }),
            };
          }
          return comment;
        })
      );
    }
  };

  const toggleShowReplies = (commentId) => {
    setShowReplies((prevShowReplies) => ({
      ...prevShowReplies,
      [commentId]: !prevShowReplies[commentId],
    }));
  };

  const renderComments = (comments, parentId = id) => {
    return comments.filter(comment => comment.parentId === parentId).map(comment => (
      <div key={comment._id} className="p-4 mb-4 bg-primary/5 drop-shadow-xl rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <Link to={`/${comment.author.clerkId}`} className="text-primary hover:underline">
              {comment.author.clerkId === userId ? "You" : comment.author.name}
            </Link>
            <p className="text-secondary_text text-sm">{formatDate(comment.date)}</p>
          </div>
        </div>
        <p className="text-primary_text mt-2">{comment.content}</p>
        <div className="flex items-center mt-2 text-secondary_text">
          <span className="flex items-center mr-4">
            <MdThumbUp
              className={`mr-2 cursor-pointer ${comment.upvotes.includes(user?._id) ? "text-primary" : ""}`}
              onClick={() => handleCommentUpvote(comment._id, comment.parentId, comment.upvotes.includes(user?._id))}
            />
            {comment.upvotes.length}
          </span>
          <span className="flex items-center mr-4">
            <MdThumbDown
              className={`mr-2 cursor-pointer ${comment.downvotes.includes(user?._id) ? "text-primary" : ""}`}
              onClick={() => handleCommentDownvote(comment._id, comment.parentId, comment.downvotes.includes(user?._id))}
            />
            {comment.downvotes.length}
          </span>
          <button
            onClick={() => handleReplyClick(comment)}
            className="text-primary underline"
          >
            Reply
          </button>
        </div>
        <div className="ml-8">
          {!showReplies[comment._id] && comment.replies.length > 0 && (
            <button
              onClick={() => toggleShowReplies(comment._id)}
              className="text-primary underline mt-2"
            >
              Show all replies ({comment.replies.length})
            </button>
          )}
          {showReplies[comment._id] && comment.replies.length > 0 && (
            <button
              onClick={() => toggleShowReplies(comment._id)}
              className="text-primary underline mt-2"
            >
              Hide replies
            </button>
          )}
          {showReplies[comment._id] && renderComments(comment.replies, comment._id)}
          {replyingTo === comment._id && (
            <form onSubmit={(e) => handleReplySubmit(e, comment.parentId === id ? comment._id : comment.parentId)} className="mt-4">
              <textarea
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                className="w-full p-2 border rounded-lg"
                rows="2"
                placeholder="Add a reply..."
                required
              />
              <button
                type="submit"
                className="mt-2 bg-primary text-primary_text hover:bg-border hover:text-primary px-4 py-2 rounded-lg"
              >
                Add Reply
              </button>
            </form>
          )}
        </div>
      </div>
    ));
  };

  return (
    <>
      <div className="w-full flex justify-center bg-background drop-shadow-2xl">
        <Header />
      </div>
      <div className="min-h-screen bg-background text-primary_text p-4 flex flex-col items-center">
        <div className="w-full lg:w-2/3 bg-background p-6 rounded-lg shadow-lg">
          <div className="mt-4 self-start flex flex-wrap items-center justify-between">
            <Link to="/dashboard" className="text-primary underline flex items-center">
              <IoArrowBack className="text-primary " />
              Back to Dashboard
            </Link>
            {blogPost.author.clerkId === userId && (
              <Link to="edit">
                <button className="bg-primary text-primary_text hover:bg-border hover:text-primary px-4 py-2 rounded-lg flex items-center">
                  <FaEdit className="mr-2" /> Edit Post
                </button>
              </Link>
            )}
          </div>
          <h1 className="text-3xl font-bold mb-4">{blogPost.title}</h1>
          <div className="flex items-center text-secondary_text mb-4">
            <pre>by </pre>
            <Link to={`/${blogPost.author.clerkId}`}>
              <p className="text-secondary_text text-sm hover:underline">
                {blogPost.author.clerkId === userId ? "You" : blogPost.author.name}
              </p>
            </Link>
            <p className="text-sm ml-4">{formatDate(blogPost.date)}</p>
          </div>
          <p className="text-primary mb-4">
            Problem Link:{" "}
            <a href={blogPost.problemLink} className="text-primary underline truncate block">
              {blogPost.problemLink}
            </a>
          </p>
          <div className="mb-4">
            {blogPost.tags.map((tag, index) => (
              <span
                key={index}
                className="bg-primary/10 text-primary_text/70 px-2 py-1 rounded-full mr-2 text-sm"
              >
                #{tag}
              </span>
            ))}
          </div>
          <div className="flex items-center text-secondary_text mb-4">
            <span className="flex items-center mr-4">
              <MdThumbUp
                className={`mr-2 cursor-pointer ${hasUpvoted ? "text-primary" : ""}`}
                onClick={handleUpvote}
              />
              {upvoteCount}
            </span>
            <span className="flex items-center mr-4">
              <MdThumbDown
                className={`mr-2 cursor-pointer ${hasDownvoted ? "text-primary" : ""}`}
                onClick={handleDownvote}
              />
              {downvoteCount}
            </span>
            <span className="flex items-center mr-4">
              <FiMessageCircle className="mr-2" /> {comments.length + comments.reduce((sum,array) => sum + array.replies?.length , 0)}
            </span>
            <span className="flex items-center mr-4">
              <FaEye className="mr-2" /> {viewCount}
            </span>
            <span className="flex items-center mr-4">
              <FiBookmark
                className={`mr-2 cursor-pointer ${isFavorite ? "text-primary" : ""}`}
                onClick={isFavorite ? handleUnfavorite : handleFavorite}
              />
              {isFavorite ? "Unfavorite" : "Favorite"}
            </span>
          </div>
          <div className="mb-8">
            <pre className=" whitespace-pre-wrap">{blogPost.content}</pre>
          </div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Comments</h2>
            <div className="flex items-center space-x-2">
              <select
                className="select select-bordered w-full lg:w-auto"
                value={sortMethod}
                onChange={(e) => setSortMethod(e.target.value)}
              >
                <option value="recent">Recent</option>
                <option value="oldest">Oldest</option>
                <option value="popularity">Popularity</option>
              </select>
            </div>
          </div>
          {userId && (
            <form onSubmit={handleCommentSubmit} className="mt-4">
              <textarea
                value={commentContent}
                onChange={(e) => setCommentContent(e.target.value)}
                className="w-full p-2 border rounded-lg"
                rows="4"
                placeholder="Add a comment..."
                required
              />
              <button
                type="submit"
                className="mt-2 bg-primary text-primary_text hover:bg-border hover:text-primary px-4 py-2 rounded-lg"
              >
                Add Comment
              </button>
            </form>
          )}
          <div className="space-y-4">
            {renderComments(comments)}
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogDetailPage;
