import React from "react";
import { FiBookmark, FiMessageCircle, FiFilter, FiThumbsUp } from "react-icons/fi";
import { FaSort, FaHome, FaQuestionCircle, FaTags, FaUsers, FaPlus, FaEye } from "react-icons/fa";
import Header from "../components/Header";
import { Link } from "react-router-dom";

const DashboardPage = () => {
  // Mock data for blogs
  const blogs = [
    {
      title: "How to optimize algorithms",
      author: "JohnDoe",
      date: "May 25, 2024",
      problemLink: "https://example.com/problem",
      comments: 12,
      upvotes: 42,
      views: 120,
      tags: ["Optimization", "Algorithms"],
    },
    {
      title: "Tips for competitive programming",
      author: "JaneDoe",
      date: "May 23, 2024",
      problemLink: "https://example.com/problem2",
      comments: 8,
      upvotes: 35,
      views: 98,
      tags: ["Tips", "Competitive Programming"],
    },
    // Add more blog posts here
  ];

  return (
    <>
      <div className="w-full flex justify-center bg-background drop-shadow-2xl">
        <Header />
      </div>
      <div className="min-h-screen bg-background text-primary_text p-4 flex flex-col lg:flex-row items-start">
        {/* Sidebar */}
        <div className="w-full lg:w-1/6 bg-background p-4 rounded-lg shadow-lg mb-4 lg:mb-0">
          <nav className="flex flex-col space-y-4">
            <Link to="/" className="flex items-center text-secondary_text hover:text-primary">
              <FaHome className="mr-2" /> Home
            </Link>
            <Link to="#" className="flex items-center text-secondary_text hover:text-primary">
              <FaQuestionCircle className="mr-2" /> Questions
            </Link>
            <Link to="#" className="flex items-center text-secondary_text hover:text-primary">
              <FaTags className="mr-2" /> Tags
            </Link>
            <Link to="#" className="flex items-center text-secondary_text hover:text-primary">
              <FaUsers className="mr-2" /> Communities
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
              <Link to="/add-post">
                <button className="bg-primary text-primary_text hover:bg-border hover:text-primary px-4 py-2 rounded-lg flex items-center">
                  <FaPlus className="mr-2" /> Add Post
                </button>
              </Link>
            </div>
          </header>

          <section>
            <div className="space-y-8">
              {blogs.map((blog, index) => (
                <div key={index} className="bg-background p-4 rounded-lg shadow drop-shadow-xl border border-secondary/80">
                  <h3 className="font-bold text-lg text-primary_text underline hover:underline">{blog.title}</h3>
                  <a href={blog.problemLink} className="text-primary mb-2 block">Problem Link: {blog.problemLink}</a>
                  <div className="mb-2">
                    {blog.tags.map((tag, index) => (
                      <span key={index} className="bg-primary/10 text-primary_text/70 px-2 py-1 rounded-full mr-2 text-sm">
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-secondary_text mt-4">
                    <div className="flex items-center mb-2 sm:mb-0">
                      <p className="text-secondary_text text-sm">by {blog.author}</p>
                      <p className="text-secondary_text text-sm ml-4">{blog.date}</p>
                    </div>
                    <div className="flex items-center">
                      <span className="flex items-center mr-4">
                        <FiThumbsUp className="mr-2" /> {blog.upvotes}
                      </span>
                      <span className="flex items-center mr-4">
                        <FiMessageCircle className="mr-2" /> {blog.comments}
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