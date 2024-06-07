import React, { useState } from "react";
import {
  FiBookmark,
  FiMessageCircle,
  FiArrowUp,
  FiArrowDown,
} from "react-icons/fi";
import {
  FaHome,
  FaQuestionCircle,
  FaTags,
  FaUsers,
  FaPlus,
  FaEye,
  FaPaperPlane,
} from "react-icons/fa";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import useFetchBlogPosts from "../hooks/useFetchBlogPosts";
import { useAuth } from "@clerk/clerk-react";

const DashboardPage = () => {
  const [sortMethod, setSortMethod] = useState("recent");
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState("");
  const [platformFilter, setPlatformFilter] = useState("");
  const [page, setPage] = useState(1);
  const { blogPosts: blogs, loading, totalPages } = useFetchBlogPosts(sortMethod, page, 5, tags, platformFilter);
  const { userId } = useAuth();

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

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="w-full flex justify-center bg-background drop-shadow-2xl">
        <Header />
      </div>
      <div className="min-h-screen bg-background text-primary_text p-4 flex flex-col lg:flex-row items-start">
        {/* Sidebar */}
        <div className="w-full lg:w-1/6 bg-background p-4 rounded-lg shadow-lg mb-4 lg:mb-0">
          <nav className="flex flex-col space-y-4">
            <Link
              to="/"
              className="flex items-center text-secondary_text hover:text-primary"
            >
              <FaHome className="mr-2" /> Home
            </Link>
            <Link
              to="/dashboard"
              className="flex items-center text-secondary_text hover:text-primary"
            >
              <FaQuestionCircle className="mr-2" /> Questions
            </Link>
            <Link
              to="#"
              className="flex items-center text-secondary_text hover:text-primary"
            >
              <FaTags className="mr-2" /> Tags
            </Link>
            <Link
              to="/community"
              className="flex items-center text-secondary_text hover:text-primary"
            >
              <FaUsers className="mr-2" /> Community
            </Link>
          </nav>
        </div>

        {/* Main Content */}
        <div className="w-full lg:w-5/6 bg-background p-4 rounded-lg shadow-lg">
          <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
            <h1 className="text-3xl font-bold mb-4 lg:mb-0">All Questions</h1>
            <div className="flex flex-col lg:flex-row items-start lg:items-center space-y-4 lg:space-y-0 lg:space-x-4">
              <select
                className="select select-bordered w-full lg:w-auto"
                value={sortMethod}
                onChange={(e) => setSortMethod(e.target.value)}
              >
                <option value="recent">Recent</option>
                <option value="oldest">Oldest</option>
                <option value="popularity">Popularity</option>
                <option value="views">Most Viewed</option>
              </select>
              <div className="flex items-center">
                <input
                  id="tags"
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyDown={handleAddTag}
                  className="input input-bordered w-full lg:w-auto p-2"
                  placeholder="Add tag"
                />
                <button
                  type="button"
                  onClick={handleAddTag}
                  className="ml-2 p-2 rounded-lg bg-primary text-primary_text hover:bg-border hover:text-primary"
                >
                  <FaPaperPlane />
                </button>
              </div>
              <input
                type="text"
                className="input input-bordered w-full lg:w-auto"
                placeholder="All Platforms"
                value={platformFilter}
                onChange={(e) => setPlatformFilter(e.target.value)}
              />
              {userId && (
                <Link to="add-post">
                  <button className="bg-primary text-primary_text hover:bg-border hover:text-primary px-4 py-2 rounded-lg flex items-center">
                    <FaPlus className="mr-2" /> Add Post
                  </button>
                </Link>
              )}
            </div>
          </header>
          <div className="flex flex-wrap mt-4 lg:mt-0">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="bg-primary/10 text-primary_text/70 px-2 py-1 rounded-full mr-2 mb-2 text-sm"
              >
                {tag}
                <button
                  onClick={() => handleTagRemove(index)}
                  className="ml-1 text-primary hover:text-tertiary"
                >
                  &times;
                </button>
              </span>
            ))}
          </div>
          <section>
            <div className="space-y-8">
              {blogs.map((blog) => (
                <div
                  key={blog._id}
                  className="bg-background p-4 rounded-lg shadow drop-shadow-xl border border-secondary/80"
                >
                  <Link to={`blog/${blog._id}`}>
                    <h3 className="font-bold text-lg text-primary_text hover:underline">
                      {blog.title}
                    </h3>
                  </Link>
                  <a
                    href={blog.problemLink}
                    className="text-primary mb-2 block hover:underline truncate"
                  >
                    Problem Link: {blog.problemLink}
                  </a>
                  <div className="mb-2 whitespace-nowrap overflow-scroll">
                    {blog.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-primary/10 text-primary_text/70 px-2 py-1 rounded-full mr-2 text-sm"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-secondary_text mt-4">
                    <div className="flex items-center mb-2 sm:mb-0">
                      <Link to={`/${blog.author.clerkId}`}>
                        <p className="text-secondary_text text-sm hover:underline">
                          {blog.author.name}
                        </p>
                      </Link>
                      <p className="text-secondary_text text-sm ml-4">
                        {new Date(blog.date).toLocaleString()}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <span className="flex items-center mr-4">
                        <FiArrowUp className="mr-2" /> {blog.upvotes.length}
                      </span>
                      <span className="flex items-center mr-4">
                        <FiArrowDown className="mr-2" /> {blog.downvotes.length}
                      </span>
                      <span className="flex items-center mr-4">
                        <FiMessageCircle className="mr-2" />
                        {blog.commentsCount}
                      </span>
                      <span className="flex items-center mr-4">
                        <FaEye className="mr-2" /> {blog.views.length}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
          {/* Pagination Controls */}
          <div className="flex justify-center mt-8">
            <button
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
              className="px-4 py-2 mx-1 bg-primary text-primary_text rounded-lg disabled:opacity-50"
            >
              Previous
            </button>
            <span className="px-4 py-2 mx-1">{`Page ${page} of ${totalPages}`}</span>
            <button
              onClick={() => setPage(page + 1)}
              disabled={page === totalPages}
              className="px-4 py-2 mx-1 bg-primary text-primary_text rounded-lg disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
