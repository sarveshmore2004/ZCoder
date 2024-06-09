import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import useFetchUsers from "../hooks/useFetchUsers";
import Spinner from "../components/spinner";

const CommunityPage = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const { users, loading, totalPages } = useFetchUsers(search, page , 20);
  const [loadingFirstTime, setLoadingFirstTime] = useState(true);

  const handleSearch = (e) => {
    // e.preventDefault();
    setSearch(e.target.value);
    setPage(1);
  };

  useEffect(() => {
    setLoadingFirstTime(false);
  }, []);

  if (loadingFirstTime) {
    return <Spinner />;
  }

  return (
    <>
      <div className="w-full flex justify-center bg-background drop-shadow-2xl">
        <Header />
      </div>
      <div className="min-h-screen bg-background text-primary_text p-4 flex flex-col items-center">
        <div className="w-full  bg-background p-4 rounded-lg shadow-lg">
          <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
            <h1 className="text-3xl font-bold mb-4 lg:mb-0">Community</h1>
            <form
              onSubmit={handleSearch}
              className="flex flex-col lg:flex-row items-start lg:items-center space-y-4 lg:space-y-0 lg:space-x-4 w-full lg:w-auto"
            >
              <input
                type="text"
                className="input input-bordered w-full lg:w-auto"
                placeholder="Search users"
                value={search}
                onChange={handleSearch}
              />
              {/* <button
                type="submit"
                className="bg-primary text-primary_text hover:bg-border hover:text-primary px-4 py-2 rounded-lg"
              >
                Search
              </button> */}
            </form>
          </header>

          {loading && (
            <div className="self-center w-10 h-10 border-4 border-primary border-dashed rounded-full animate-spin m-2"></div>
          )}
          <section>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {users.map((user) => (
                <Link
                  key={user.clerkId}
                  to={`/${user.clerkId}`}
                  className="bg-background p-4 rounded-lg shadow drop-shadow-xl border border-secondary/80 flex flex-col items-center hover:bg-primary/20 hover:text-primary transition-all duration-200"
                >
                  <img
                    className="rounded-full w-24 h-24 mb-4"
                    src={user.avatar}
                    alt={user.name}
                  />
                  <h2 className="text-xl font-semibold text-primary_text line-clamp-1">
                    {user.name}
                  </h2>
                  <div className="m-2 whitespace-nowrap overflow-scroll">
                    {user.knownLanguages.map((language, index) => (
                      <span
                        key={index}
                        className="bg-primary/10 text-primary_text/70 px-2 py-1 rounded-full mr-2 text-sm"
                      >
                        {language}
                      </span>
                    ))}
                  </div>
                  <div className="text-secondary_text text-center mt-2 line-clamp-1 ">
                    {user.bio}
                  </div>
                </Link>
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
            <span className="px-4 py-2 mx-1">{`Page ${totalPages === 0 ? '0' : page} of ${totalPages}`}</span>
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
    </>
  );
};

export default CommunityPage;
