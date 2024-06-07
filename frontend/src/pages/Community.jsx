import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaHome, FaQuestionCircle, FaTags, FaUsers } from "react-icons/fa";
import Header from "../components/Header";
import useFetchUsers from "../hooks/useFetchUsers";

const CommunityPage = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const { users, loading, totalPages } = useFetchUsers( search , page);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(query);
    setPage(1);
  };

  return (
    <>
      <div className="w-full flex justify-center bg-background drop-shadow-2xl">
        <Header />
      </div>
      <div className="min-h-screen bg-background text-primary_text p-4 flex flex-col lg:flex-row items-start">
        {/* Sidebar */}
        <div className="w-full lg:w-1/6 bg-background p-4 rounded-lg shadow-lg mb-4 lg:mb-0">
          <nav className="flex flex-col space-y-4">
            <Link to="/dashboard" className="flex items-center text-secondary_text hover:text-primary">
              <FaHome className="mr-2" /> Home
            </Link>
            <Link to="/questions" className="flex items-center text-secondary_text hover:text-primary">
              <FaQuestionCircle className="mr-2" /> Questions
            </Link>
            <Link to="/tags" className="flex items-center text-secondary_text hover:text-primary">
              <FaTags className="mr-2" /> Tags
            </Link>
            <Link to="/community" className="flex items-center text-secondary_text hover:text-primary">
              <FaUsers className="mr-2" /> Community
            </Link>
          </nav>
        </div>

        {/* Main Content */}
        <div className="w-full lg:w-5/6 bg-background p-4 rounded-lg shadow-lg">
          <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
            <h1 className="text-3xl font-bold mb-4 lg:mb-0">Community</h1>
            <form onSubmit={handleSearch} className="flex flex-col lg:flex-row items-start lg:items-center space-y-4 lg:space-y-0 lg:space-x-4">
              <input
                type="text"
                className="input input-bordered w-full lg:w-auto"
                placeholder="Search users"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button
                type="submit"
                className="bg-primary text-primary_text hover:bg-border hover:text-primary px-4 py-2 rounded-lg"
              >
                Search
              </button>
            </form>
          </header>

          {loading ? (
            <p>Loading...</p>
          ) : (
            <section>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {users.map((user) => (
                  <Link
                    key={user.clerkId}
                    to={`/${user.clerkId}`}
                    className="bg-background p-4 rounded-lg shadow drop-shadow-xl border border-secondary/80 flex flex-col items-center hover:bg-primary/20 hover:text-primary"
                  >
                    <img className="rounded-full w-24 h-24 mb-4" src={user.avatar} alt={user.name} />
                    <h2 className="text-xl font-semibold text-primary_text">{user.name}</h2>
                    <p className="text-secondary_text text-center mt-2">{user.bio}</p>
                  </Link>
                ))}
              </div>
            </section>
          )}

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

export default CommunityPage;
