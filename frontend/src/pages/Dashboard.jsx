import React from "react";
import {
  FiBookmark,
  FiMessageCircle,
  FiFilter,
  FiThumbsUp,
} from "react-icons/fi";
import {
  FaSort,
  FaHome,
  FaQuestionCircle,
  FaTags,
  FaUsers,
  FaPlus,
  FaEye,
} from "react-icons/fa";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import useFetchBlogPosts from "../hooks/useFetchBlogPosts";
import { useAuth } from "@clerk/clerk-react";

const DashboardPage = () => {
  const { blogPosts: blogs, loading } = useFetchBlogPosts();
  const { userId } = useAuth();

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
            <div className="flex flex-col lg:flex-row items-start lg:items-center">
              <button className="border text-white px-4 py-2 rounded-lg flex items-center mb-4 lg:mb-0 lg:mr-4">
                <FaSort className="mr-2" /> Sort By
              </button>
              <button className="border text-white px-4 py-2 rounded-lg flex items-center mb-4 lg:mb-0 lg:mr-4">
                <FiFilter className="mr-2" /> Filter
              </button>
              {userId && (
                <Link to="add-post">
                  <button className="bg-primary text-primary_text hover:bg-border hover:text-primary px-4 py-2 rounded-lg flex items-center">
                    <FaPlus className="mr-2" /> Add Post
                  </button>
                </Link>
              )}
            </div>
          </header>

          <section>
            <div className="space-y-8">
              {blogs.map((blog) => (
                <div
                  key={blog._id}
                  className="bg-background p-4 rounded-lg shadow drop-shadow-xl border border-secondary/80"
                >
                  <Link to={`blog/${blog._id}`}>
                    <h3 className="font-bold text-lg text-primary_text  hover:underline">
                      {blog.title}
                    </h3>
                  </Link>
                  <a
                    href={blog.problemLink}
                    className="text-primary mb-2 block hover:underline "
                  >
                    Problem Link: {blog.problemLink}
                  </a>
                  <div className="mb-2">
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
                        <FiThumbsUp className="mr-2" /> {blog.upvotes.length}
                      </span>
                      <span className="flex items-center mr-4">
                        <FiMessageCircle className="mr-2" />
                        {blog.commentsCount}
                      </span>
                      <span className="flex items-center mr-4">
                        <FaEye className="mr-2" /> {blog.views}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
