import React from "react";
import { FiBookmark, FiMessageCircle } from "react-icons/fi";
import { FaExternalLinkAlt, FaGithub, FaLinkedin } from "react-icons/fa";
import Header from "../components/Header";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";

const Profile = () => {
  const navigate=useNavigate();
  const {userId}=useAuth();
  const user = {
    name: "JohnDoe",
    avatar: "https://via.placeholder.com/150",
    bio: "A passionate developer and competitive programming enthusiast.",
    bookmarks: 45,
    comments: 123,
    codingProfiles: {
      leetcode: "https://leetcode.com/JohnDoe",
      codeforces: "https://codeforces.com/profile/JohnDoe",
      codechef: "https://www.codechef.com/users/JohnDoe",
      atcoder: "https://atcoder.jp/users/JohnDoe",
    },
    socialProfiles: {
      github: "https://github.com/JohnDoe",
      linkedin: "https://www.linkedin.com/in/JohnDoe",
    },
    recentActivity: {
      comments: [
        "Commented on: Binary Search Solution",
        "Commented on: Dynamic Programming Challenge",
      ],
      posts: [
        "Posted: How to optimize algorithms",
        "Posted: Tips for competitive programming",
      ],
    },
  };

  const handleEdit = () => {
    navigate(`/${userId}/edit`)
  }

  return (
    <>
    <div className=" w-full flex justify-center bg-background drop-shadow-2xl">
      <Header/>
    </div>
    <div className="min-h-screen bg-background text-primary_text p-4 flex flex-col lg:flex-row items-start">
      {/* Sidebar */}
      <div className="w-full lg:w-1/4 bg-background p-4 rounded-lg shadow-lg">
        <div className="flex flex-col items-center">
          <img
            className="rounded-full w-24 h-24 mb-4"
            src={user.avatar}
            alt={user.name}
          />
          <h2 className="text-xl font-semibold text-primary_text">{user.name}</h2>
          <p className="text-secondary_text text-center mt-2">{user.bio}</p>
          <button onClick={handleEdit} className="mt-4 bg-primary text-white py-2 px-4 rounded-lg">
            Edit Profile
          </button>
        </div>
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4 text-primary_text">Profile Stats</h3>
          <div className="flex items-center justify-between text-secondary_text mb-2">
            <span className="flex items-center">
              <FiBookmark className="mr-2" /> Bookmarks
            </span>
            <span>{user.bookmarks}</span>
          </div>
          <div className="flex items-center justify-between text-secondary_text mb-2">
            <span className="flex items-center">
              <FiMessageCircle className="mr-2" /> Comments
            </span>
            <span>{user.comments}</span>
          </div>
          <h3 className="text-lg font-semibold mt-8 mb-4 text-primary_text">Coding Profiles</h3>
          {Object.entries(user.codingProfiles).map(([site, url], index) => (
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
          ))}
          <h3 className="text-lg font-semibold mt-8 mb-4 text-primary_text">Social Profiles</h3>
          <div className="flex items-center justify-between text-secondary_text mb-2">
            <a
              href={user.socialProfiles.github}
              className="flex items-center hover:text-primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub className="mr-2" /> GitHub
            </a>
          </div>
          <div className="flex items-center justify-between text-secondary_text mb-2">
            <a
              href={user.socialProfiles.linkedin}
              className="flex items-center hover:text-primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin className="mr-2" /> LinkedIn
            </a>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full lg:w-3/4 mt-8 lg:mt-0 lg:ml-8 bg-background p-4 rounded-lg shadow-lg">
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4 text-primary_text">Recent Activity</h3>

          <div role="tablist" className="tabs tabs-lifted">
            <input
              type="radio"
              name="my_tabs_2"
              role="tab"
              className="tab"
              aria-label="Posts"
              checked
            />
            <div
              role="tabpanel"
              className="tab-content bg-background border-secondary rounded-box p-6"
            >
              <ul>
                {user.recentActivity.posts.map((activity, index) => (
                  <li key={index} className="mb-2 text-secondary_text">
                    {activity}
                  </li>
                ))}
              </ul>
            </div>
            <input
              type="radio"
              name="my_tabs_2"
              role="tab"
              className="tab"
              aria-label="Comments"
            />
            <div
              role="tabpanel"
              className="tab-content bg-background border-secondary rounded-box p-6"
            >
              <ul>
                {user.recentActivity.comments.map((activity, index) => (
                  <li key={index} className="mb-2 text-secondary_text">
                    {activity}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>

  );
};

export default Profile;
