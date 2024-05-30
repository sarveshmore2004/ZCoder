// pages/EditProfile.js
import React, { useState } from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const [user, setUser] = useState({
    name: "JohnDoe",
    favlan: "C++",
    bio: "A passionate developer and competitive programming enthusiast.",
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
  });

  const navigate=useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.includes(".")) {
      const [parent, child] = name.split(".");

      setUser({
        ...user,
        [parent]: {
          ...user[parent],
          [child]: value,
        },
      });
    } else {
      setUser({
        ...user,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Update user profile logic here
    console.log("Profile updated", user);
  };

  const handleCancel = () => {
    navigate('/profile')
  }

  return (
    <>
      <div className="w-full flex justify-center bg-background drop-shadow-2xl">
        <Header />
      </div>
      <div className="min-h-screen bg-background text-primary_text p-4 flex justify-center items-center">
        <div className="w-full max-w-2xl bg-background p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-primary_text mb-6">Edit Profile</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="mb-4">
              <label className="block text-secondary_text mb-2" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={user.name}
                onChange={handleChange}
                className="w-full p-3 border border-secondary rounded-lg"
              />
            </div>
            <div className="mb-4">
              <label className="block text-secondary_text mb-2" htmlFor="favlan">
                Favourite Language
              </label>
              <input
                type="text"
                id="favlan"
                name="favlan"
                value={user.favlan}
                onChange={handleChange}
                className="w-full p-3 border border-secondary rounded-lg"
              />
            </div>
            <div className="mb-4">
              <label className="block text-secondary_text mb-2" htmlFor="bio">
                Bio
              </label>
              <textarea
                id="bio"
                name="bio"
                value={user.bio}
                onChange={handleChange}
                className="w-full p-3 border border-secondary rounded-lg"
              />
            </div>
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-primary_text mb-2">Coding Profiles</h3>
              {Object.entries(user.codingProfiles).map(([site, url], index) => (
                <div key={index} className="mb-4">
                  <label className="block text-secondary_text mb-2" htmlFor={site}>
                    {site.charAt(0).toUpperCase() + site.slice(1)}
                  </label>
                  <input
                    type="text"
                    id={site}
                    name={`codingProfiles.${site}`}
                    value={url}
                    onChange={handleChange}
                    className="w-full p-3 border border-secondary rounded-lg"
                  />
                </div>
              ))}
            </div>
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-primary_text mb-2">Social Profiles</h3>
              {Object.entries(user.socialProfiles).map(([site, url], index) => (
                <div key={index} className="mb-4">
                  <label className="block text-secondary_text mb-2" htmlFor={site}>
                    {site.charAt(0).toUpperCase() + site.slice(1)}
                  </label>
                  <input
                    type="text"
                    id={site}
                    name={`socialProfiles.${site}`}
                    value={url}
                    onChange={handleChange}
                    className="w-full p-3 border border-secondary rounded-lg"
                  />
                </div>
              ))}
            </div>
            <div className="flex space-x-4 mt-4">
              <button
                type="submit"
                className="bg-primary text-white py-2 px-4 rounded-lg"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="bg-primary text-white py-2 px-4 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditProfile;