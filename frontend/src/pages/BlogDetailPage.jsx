import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { FiThumbsUp, FiMessageCircle } from "react-icons/fi";
import { IoArrowBack } from "react-icons/io5";
import { FaEdit, FaEye } from "react-icons/fa";
import Header from "../components/Header";
import useFetchBlogPostbyId from "../hooks/useFetchBlogPostbyId.js";
import useAddCommentToBlogPost from "../hooks/useAddCommentToBlogPost";
import { useAuth } from "@clerk/clerk-react";
import useFetchUserById from "../hooks/useFetchUserById.js";

const BlogDetailPage = () => {
  const { id } = useParams();
  const { blogPost, loading } = useFetchBlogPostbyId(id);
  const { addComment } = useAddCommentToBlogPost(id);
  const [commentContent, setCommentContent] = useState("");
  const { userId, isLoaded } = useAuth();
  let user=null;
  if (userId) {
    user = useFetchUserById(userId);    
  }
  const [comments, setComments] = useState([]);

  useEffect(() => {
    if (blogPost) {
      setComments(blogPost.comments);
    }
  }, [blogPost]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (blogPost?.message) {
    return <div>Blog post not found.</div>;
  }

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    const newComment = await addComment(commentContent, user.user._id);
    if (newComment) {
      setComments([...comments, newComment]);
    }
    setCommentContent("");
  };

  return (
    <>
      <div className="w-full flex justify-center bg-background drop-shadow-2xl">
        <Header />
      </div>
      <div className="min-h-screen bg-background text-primary_text p-4 flex flex-col items-center">
        <div className="w-full lg:w-2/3 bg-background p-4 rounded-lg shadow-lg">
          <div className="mt-4 self-start flex flex-wrap items-center justify-between">
            <Link
              to="/dashboard"
              className="text-primary underline flex items-center"
            >
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
            <p className="text-sm">by {blogPost.author.name}</p>
            <p className="text-sm ml-4">
              {new Date(blogPost.date).toLocaleString()}
            </p>
          </div>
          <p className="text-primary mb-4">
            Problem Link:{" "}
            <a href={blogPost.problemLink} className="text-primary underline">
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
              <FiThumbsUp className="mr-2" /> {blogPost.upvotes}
            </span>
            <span className="flex items-center mr-4">
              <FiMessageCircle className="mr-2" /> {blogPost.commentsCount}
            </span>
            <span className="flex items-center mr-4">
              <FaEye className="mr-2" /> {blogPost.views}
            </span>
          </div>
          <div className="mb-8">
            <p>{blogPost.content}</p>
          </div>
          <section className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Comments</h2>
            <div className="space-y-4">
              {comments.map((comment, index) => (
                <div
                  key={index}
                  className="bg-background p-4 rounded-lg shadow border border-secondary/80"
                >
                  <div className="flex gap-1">
                    <Link to={`/${comment.author.clerkId}`}>
                      <p className="text-secondary_text text-sm mb-2 underline">
                        {comment.author.name}
                      </p>
                    </Link>
                    <p className="text-secondary_text text-sm mb-2">
                      {new Date(comment.date).toLocaleString()}
                    </p>
                  </div>
                  <p className="text-primary_text">{comment.content}</p>
                </div>
              ))}
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
            </form>)}
          </section>
        </div>
      </div>
    </>
  );
};

export default BlogDetailPage;
