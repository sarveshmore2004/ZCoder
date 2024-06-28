import React from "react";
import { FiBookmark, FiMessageCircle, FiLock, FiUnlock } from "react-icons/fi";
import { FaExternalLinkAlt, FaGithub, FaLinkedin } from "react-icons/fa";
import Header from "../components/Header";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import useFetchUserById from "../hooks/useFetchUserById";
import formatDate from "../utils/formatDate";
import Spinner from "../components/spinner";

const Profile = () => {
  const navigate = useNavigate();
  const { userId, isLoaded } = useAuth();
  const { userid } = useParams();

  const { user, loading } = useFetchUserById(userid, true);

  const handleEdit = () => {
    navigate(`/${userId}/edit`);
  };

  let publicPosts = user?.recentActivity?.posts.toReversed();
  let publicComments = user?.recentActivity?.comments.toReversed();
  let favoritePosts = user?.favorites;

  publicComments =
    user?.recentActivity?.comments?.filter((comment) => comment.postId) || [];

  if (isLoaded && userId !== userid) {
    publicPosts =
      user?.recentActivity?.posts?.filter((post) => post.visibility === true) ||
      [];

    publicComments =
      user?.recentActivity?.comments?.filter(
        (comment) => comment.postId?.visibility === true
      ) || [];
  }

  return (
    <>
      <div className="w-full flex justify-center bg-background drop-shadow-2xl">
        <Header />
      </div>
      {loading && <Spinner />}
      {!loading && !user && <p>User not found</p>}
      {isLoaded && user && (
        <div className="min-h-screen bg-background text-primary_text p-4 flex flex-col lg:flex-row items-start">
          {/* Sidebar */}
          <div className="w-full lg:w-1/4 bg-background p-4 rounded-lg shadow-lg">
            <div className="flex flex-col items-center">
              <img
                className="rounded-full w-28 h-28 object-cover mb-4"
                src={user.avatar}
                alt={user.name}
              />
              <h2
                className="text-xl font-semibold text-primary_text max-w-full break-words"
                dangerouslySetInnerHTML={{ __html: user.name }}
              />
              <p
                className="text-secondary_text text-center mt-2 max-w-full break-words "
                dangerouslySetInnerHTML={{ __html: user.bio }}
              />
              {userId === userid && (
                <button
                  onClick={handleEdit}
                  className="mt-4 bg-primary text-primary_text hover:bg-border hover:text-primary py-2 px-4 rounded-lg"
                >
                  Edit Profile
                </button>
              )}
            </div>
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-4 text-primary_text">
                Profile Stats
              </h3>
              <div className="flex items-center justify-between text-secondary_text mb-2">
                <span className="flex items-center">
                  <FiBookmark className="mr-2" /> Posts
                </span>
                <span>{publicPosts.length}</span>
              </div>
              <div className="flex items-center justify-between text-secondary_text mb-2">
                <span className="flex items-center">
                  <FiMessageCircle className="mr-2" /> Comments
                </span>
                <span>{publicComments.length}</span>
              </div>
              <h3 className="text-lg font-semibold mt-8 mb-4 text-primary_text">
                Languages
              </h3>
              <div className="flex flex-wrap gap-2">
                {user.knownLanguages &&
                  user.knownLanguages.map((language, index) => (
                    <div
                      key={index}
                      className="bg-secondary text-primary_text py-1 px-2 rounded-lg"
                    >
                      {language.charAt(0).toUpperCase() +
                        language.slice(1).toLowerCase()}
                    </div>
                  ))}
              </div>
              <h3 className="text-lg font-semibold mt-8 mb-4 text-primary_text">
                Coding Profiles
              </h3>
              {user.codingProfiles &&
                Object.entries(user.codingProfiles).map(
                  ([site, url], index) =>
                    url && (
                      <div
                        key={index}
                        className="flex items-center justify-between text-secondary_text mb-2"
                      >
                        <a
                          href={url}
                          className="flex items-center hover:text-primary"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <FaExternalLinkAlt className="mr-2" />{" "}
                          {site.charAt(0).toUpperCase() + site.slice(1)}
                        </a>
                      </div>
                    )
                )}
              <h3 className="text-lg font-semibold mt-8 mb-4 text-primary_text">
                Social Profiles
              </h3>
              {user.socialProfiles &&
                Object.entries(user.socialProfiles).map(
                  ([site, url], index) =>
                    url && (
                      <div
                        key={index}
                        className="flex items-center justify-between text-secondary_text mb-2"
                      >
                        <a
                          href={url}
                          className="flex items-center hover:text-primary"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {site === "github" ? (
                            <FaGithub className="mr-2" />
                          ) : (
                            <FaLinkedin className="mr-2" />
                          )}
                          {site.charAt(0).toUpperCase() + site.slice(1)}
                        </a>
                      </div>
                    )
                )}
            </div>
          </div>

          {/* Main Content */}
          <div className=" w-full lg:w-3/4 mt-8 lg:mt-0 lg:ml-8 bg-background p-4 rounded-lg shadow-lg ">
            <div className="mt-8 max-w-full">
              <h3 className="text-lg font-semibold mb-4 text-primary_text">
                Recent Activity
              </h3>

              <div role="tablist" className="tabs tabs-lifted  ">
                <input
                  type="radio"
                  name="my_tabs_2"
                  role="tab"
                  className="tab hover:bg-border hover:text-primary"
                  aria-label="Posts"
                  defaultChecked
                />
                <div
                  role="tabpanel"
                  className="tab-content bg-background border-secondary rounded-box p-6 max-w-full  truncate"
                >
                  <ul>
                    {publicPosts.map((post, index) => (
                      <li key={index} className="mb-4 max-w-full ">
                        <div className="flex items-center justify-between text-secondary_text max-w-full">
                          <Link
                            to={`/dashboard/blog/${post._id}`}
                            className="flex-1  truncate "
                          >
                            <div
                              className="text-primary_text hover:underline text-sm sm:text-base hover:text-primary  "
                              dangerouslySetInnerHTML={{ __html: post.title }}
                            />
                          </Link>
                          <span className="ml-2 flex-shrink-0 flex-grow-0 text-xs flex flex-nowrap gap-1 sm:text-sm ">
                            {formatDate(post.date)}
                            {post.visibility === true ? (
                              <FiUnlock
                                className="ml-2 text-green-500"
                                title="Public"
                              />
                            ) : (
                              <FiLock
                                className="ml-2 text-red-500"
                                title="Private"
                              />
                            )}
                          </span>
                        </div>
                        <div className="divider m-0"></div>
                      </li>
                    ))}
                  </ul>
                </div>
                <input
                  type="radio"
                  name="my_tabs_2"
                  role="tab"
                  className="tab hover:bg-border hover:text-primary"
                  aria-label="Comments"
                />
                <div
                  role="tabpanel"
                  className="tab-content bg-background border-secondary rounded-box p-6 max-w-full  truncate"
                >
                  <ul>
                    {publicComments.map((comment, index) => (
                      <li key={index} className="mb-4 max-w-full ">
                        <div className="flex items-center justify-between text-secondary_text max-w-full">
                          <Link
                            to={`/dashboard/blog/${comment.postId?._id}`}
                            className="flex-1  truncate "
                          >
                            <div
                              className="text-primary_text hover:underline text-sm sm:text-base hover:text-primary  "
                              dangerouslySetInnerHTML={{
                                __html: comment.content,
                              }}
                            />
                          </Link>
                          <span className="ml-2 flex-shrink-0 flex-grow-0 text-xs flex flex-nowrap gap-1 sm:text-sm ">
                            {formatDate(comment.date)}
                            {comment.postId?.visibility === true ? (
                              <FiUnlock
                                className="ml-2 text-green-500"
                                title="Public"
                              />
                            ) : (
                              <FiLock
                                className="ml-2 text-red-500"
                                title="Private"
                              />
                            )}
                          </span>
                        </div>
                        <div className="divider m-0"></div>
                      </li>
                    ))}
                  </ul>
                </div>
                {userId === userid && (
                  <>
                    <input
                      type="radio"
                      name="my_tabs_2"
                      role="tab"
                      className="tab hover:bg-border hover:text-primary"
                      aria-label="Favorites"
                    />
                    <div
                      role="tabpanel"
                      className="tab-content bg-background border-secondary rounded-box p-6 max-w-full  truncate"
                    >
                      <ul>
                        {favoritePosts.map((post, index) => (
                          <li key={index} className="mb-4 max-w-full ">
                            <div className="flex items-center justify-between text-secondary_text max-w-full">
                              <Link
                                to={`/dashboard/blog/${post._id}`}
                                className="flex-1  truncate "
                              >
                                <div
                                  className="text-primary_text hover:underline text-sm sm:text-base hover:text-primary  "
                                  dangerouslySetInnerHTML={{
                                    __html: post.title,
                                  }}
                                />
                              </Link>
                              <span className="ml-2 flex-shrink-0 flex-grow-0 text-xs flex flex-nowrap gap-1 sm:text-sm ">
                                {formatDate(post.date)}
                                {post.visibility === true ? (
                                  <FiUnlock
                                    className="ml-2 text-green-500"
                                    title="Public"
                                  />
                                ) : (
                                  <FiLock
                                    className="ml-2 text-red-500"
                                    title="Private"
                                  />
                                )}
                              </span>
                            </div>
                            <div className="divider m-0"></div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
