import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { useAuth } from "@clerk/clerk-react";
import { FaPaperPlane } from "react-icons/fa";
import useFetchUserById from "../hooks/useFetchUserById.js";
import useCreateBlogPost from "../hooks/useCreateBlogPost.js";

const AddPostPage = () => {
  const navigate = useNavigate();
  const { userId, isLoaded } = useAuth();

  if (!isLoaded) {
    return <div>Loading...</div>;
  } else if (!userId) {
    navigate(-1);
  } else {
    const { user: fetchedUser, loading } = useFetchUserById(userId);
    console.log(fetchedUser);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [tags, setTags] = useState([]);
    const [newTag, setNewTag] = useState("");
    const [isPublic, setIsPublic] = useState(true);
    const [problemLink, setProblemLink] = useState("");
    const { createBlogPost } = useCreateBlogPost();

    const handleSubmit = async (e) => {
      e.preventDefault();
      // Create the blog post object
      const newPost = {
        title,
        content,
        tags,
        author: fetchedUser._id,
        problemLink,
        visibility: isPublic,
      };

      await createBlogPost(newPost);

      console.log(newPost);
      navigate("/dashboard");
    };

    const handleTagAdd = () => {
      if (newTag.trim() !== "") {
        setTags([...tags, newTag.trim()]);
        setNewTag("");
      }
    };

    const handleTagKeyDown = (e) => {
      if (e.key === "Enter" && newTag.trim() !== "") {
        handleTagAdd();
        e.preventDefault();
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
            <h1 className="text-3xl font-bold mb-4">Add New Post</h1>
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
                        className="ml-2 text-primary"
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
                      onKeyDown={handleTagKeyDown}
                      className="w-10/12 p-2 border rounded-lg flex-grow"
                      placeholder="Type and press enter to add tags"
                    />
                    <button
                      type="button"
                      onClick={handleTagAdd}
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
              <button
                type="submit"
                className="bg-primary text-primary_text hover:bg-border hover:text-primary px-4 py-2 rounded-lg"
              >
                Add Post
              </button>
            </form>
          </div>
        </div>
      </>
    );
  }
};

export default AddPostPage;
