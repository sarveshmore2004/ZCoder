import React, { useEffect, useState } from "react";
import { FiMessageCircle, FiArrowUp, FiArrowDown } from "react-icons/fi";
import { FaPlus, FaEye, FaPaperPlane } from "react-icons/fa";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import useFetchBlogPosts from "../hooks/useFetchBlogPosts";
import { useAuth } from "@clerk/clerk-react";
import formatDate from "../utils/formatDate";
import Spinner from "../components/spinner";

const DashboardPage = () => {
  const [sortMethod, setSortMethod] = useState("recent");
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState("");
  const [platformFilter, setPlatformFilter] = useState("");
  const [problemLink, setProblemLink] = useState("");
  const [page, setPage] = useState(1);
  const {
    blogPosts: blogs,
    loading,
    totalPages,
  } = useFetchBlogPosts(
    sortMethod,
    page,
    16,
    tags,
    platformFilter,
    problemLink
  );
  const { userId } = useAuth();
  const [loadingFirstTime, setLoadingFirstTime] = useState(true);

  useEffect(() => {
    setLoadingFirstTime(false);
  }, []);

  const handleAddTag = (e) => {
    if (e.key === "Enter" || e.type === "click") {
      setPage(1);
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
    setPage(1);
    setTags(tags.filter((_, i) => i !== index));
  };

  const handleProblemLinkChange = (e) => {
    setPage(1);
    setProblemLink(e.target.value);
  };

  if (loadingFirstTime) {
    return <Spinner />;
  }

  return (
    <div>
      <div className="w-full flex justify-center bg-background drop-shadow-2xl">
        <Header />
      </div>
      <div className="min-h-screen bg-background text-primary_text p-4 flex flex-col items-start">
        <div className="w-full bg-background p-4 rounded-lg shadow-lg">
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
                  placeholder="Search tags"
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
                placeholder="Problem Link/Platform Name"
                value={problemLink}
                onChange={handleProblemLinkChange}
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
                className="bg-primary/10 text-primary_text/70 px-2 py-1 rounded-full mr-2 mb-2 text-base"
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
          {loading && (
            <div className="self-center w-10 h-10 border-4 border-primary border-dashed rounded-full animate-spin m-2"></div>
          )}
          <section>
            <div className="space-y-8">
              {blogs.map((blog) => (
                <div
                  key={blog._id}
                  className="bg-background p-4 rounded-lg shadow-xl border border-secondary/80"
                >
                  <Link to={`blog/${blog._id}`}>
                    <h3
                      className="font-bold text-lg text-primary_text hover:underline line-clamp-1"
                      dangerouslySetInnerHTML={{ __html: blog.title }}
                    />
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
                        <p
                          className="text-secondary_text text-sm hover:underline"
                          dangerouslySetInnerHTML={{
                            __html: `${
                              blog.author.clerkId === userId
                                ? "You"
                                : blog.author.name
                            }`,
                          }}
                        />
                      </Link>
                      <p className="text-secondary_text text-sm ml-4">
                        {formatDate(blog.date)}
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
            <span className="px-4 py-2 mx-1">{`Page ${
              totalPages === 0 ? "0" : page
            } of ${totalPages}`}</span>
            <button
              onClick={() => setPage(page + 1)}
              disabled={page === totalPages || totalPages === 0}
              className="px-4 py-2 mx-1 bg-primary text-primary_text rounded-lg disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
