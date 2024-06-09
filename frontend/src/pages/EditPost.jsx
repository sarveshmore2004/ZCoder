import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import { useAuth } from "@clerk/clerk-react";
import { FaPaperPlane } from "react-icons/fa";
import useFetchBlogPostbyId from "../hooks/useFetchBlogPostbyId.js";
import useUpdateBlogPost from "../hooks/useUpdateBlogPost.js";
import useDeleteBlogPost from "../hooks/useDeleteBlogPost.js";
import Spinner from "../components/spinner.jsx";

const getDomainFromUrl = (url) => {
  try {
    const { hostname } = new URL(url);
    return hostname.replace('www.', '');
  } catch (error) {
    return '';
  }
};

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { userId, isLoaded } = useAuth();
  const [showError, setShowError] = useState(false);
  const { blogPost, loading } = useFetchBlogPostbyId(id);
  const { updateBlogPost } = useUpdateBlogPost();
  const { deleteBlogPost } = useDeleteBlogPost();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [problemLink, setProblemLink] = useState("");

  useEffect(() => {
    if (blogPost) {
      if (userId !== blogPost.author.clerkId) {
        setShowError(true);
        setTimeout(() => navigate(-1), 2000); // Redirect after 2 seconds
      } else {
        setTitle(blogPost.title);
        setContent(blogPost.content);
        setTags(blogPost.tags);
        setIsPublic(blogPost.visibility);
        setProblemLink(blogPost.problemLink);
      }
    }
  }, [blogPost, userId, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedPost = {
      title,
      content,
      tags,
      problemLink,
      visibility: isPublic,
      platform: getDomainFromUrl(problemLink),
    };

    await updateBlogPost(id, updatedPost);
    navigate(-1);
  };

  const handleDelete = async () => {
    await deleteBlogPost(id);
    navigate("/dashboard");
  };

  const handleAddTag = (e) => {
    if (e.key === "Enter" || e.type === "click") {
      e.preventDefault();
      if (
        newTag.trim() &&
        !tags
          .map((tag) => tag.toLowerCase())
          .includes(newTag.trim().toLowerCase())
      ) {
        setTags([...tags, newTag.trim()]);
        setNewTag("");
      }
    }
  };

  const handleTagRemove = (index) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  return (
    <>
      <div className="w-full flex justify-center bg-background drop-shadow-2xl">
        <Header />
      </div>
      <div className="min-h-screen bg-background text-primary_text p-4 flex flex-col items-center">
        <div className="w-full lg:w-2/3 bg-background p-4 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold mb-4">Edit Post</h1>
          {loading && <Spinner />}
          {!loading && showError && (
            <div className="bg-primary text-primary_text p-4 rounded mb-6">
              Unauthorized access! Redirecting to the current Post...
            </div>
          )}
          {!loading && !showError && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  className="block text-primary_text font-bold mb-2"
                  htmlFor="title"
                >
                  Title
                </label>
                <input
                  id="title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-2 border rounded-lg"
                  required
                />
              </div>
              <div>
                <label
                  className="block text-primary_text font-bold mb-2"
                  htmlFor="content"
                >
                  Content
                </label>
                <textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full p-2 border rounded-lg"
                  rows="10"
                  required
                />
              </div>
              <div>
                <label
                  className="block text-primary_text font-bold mb-2"
                  htmlFor="tags"
                >
                  Tags
                </label>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-primary/10 text-primary_text/70 px-2 py-1 rounded-full flex items-center"
                    >
                      {tag}
                      <button
                        type="button"
                        className="ml-2 text-primary hover:text-tertiary"
                        onClick={() => handleTagRemove(index)}
                      >
                        &times;
                      </button>
                    </span>
                  ))}
                  <div className="flex-grow items-center">
                    <input
                      id="tags"
                      type="text"
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      onKeyDown={handleAddTag}
                      className="w-10/12 p-2 border rounded-lg flex-grow"
                      placeholder="Type and press enter to add tags"
                    />
                    <button
                      type="button"
                      onClick={handleAddTag}
                      className="ml-2 p-2 rounded-lg bg-primary text-primary_text hover:bg-border hover:text-primary"
                    >
                      <FaPaperPlane />
                    </button>
                  </div>
                </div>
              </div>
              <div>
                <label
                  className="block text-primary_text font-bold mb-2"
                  htmlFor="problemLink"
                >
                  Problem Link
                </label>
                <input
                  id="problemLink"
                  type="url"
                  value={problemLink}
                  onChange={(e) => setProblemLink(e.target.value)}
                  className="w-full p-2 border rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-primary_text font-bold mb-2">
                  Visibility
                </label>
                <div className="flex items-center">
                  <input
                    id="public"
                    type="radio"
                    name="visibility"
                    value="public"
                    checked={isPublic}
                    onChange={() => setIsPublic(true)}
                    className="mr-2"
                  />
                  <label htmlFor="public" className="mr-4">
                    Public
                  </label>
                  <input
                    id="private"
                    type="radio"
                    name="visibility"
                    value="private"
                    checked={!isPublic}
                    onChange={() => setIsPublic(false)}
                    className="mr-2"
                  />
                  <label htmlFor="private">Private</label>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex space-x-4">
                  <button
                    type="submit"
                    className="bg-primary text-primary_text hover:bg-border hover:text-primary px-4 py-2 rounded-lg"
                  >
                    Update Post
                  </button>
                  <button
                    type="button"
                    onClick={() => navigate("/dashboard")}
                    className="bg-primary/10 text-primary_text hover:bg-border hover:text-primary px-4 py-2 rounded-lg"
                  >
                    Cancel
                  </button>
                </div>
                <button
                  type="button"
                  onClick={handleDelete}
                  className="bg-primary/20 text-primary_text hover:bg-primary px-4 py-2 rounded-lg"
                >
                  Delete
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default EditPost;
