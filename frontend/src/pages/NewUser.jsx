import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import { FaPlus } from "react-icons/fa";
import Header from "../components/Header";

const NewUserSetup = () => {
  const { userId, isLoaded } = useAuth();
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    bio: "",
    codingProfiles: {
      leetcode: "",
      codeforces: "",
      codechef: "",
      atcoder: "",
    },
    socialProfiles: {
      github: "",
      linkedin: "",
    },
    knownLanguages: [],
  });

  const [newLanguage, setNewLanguage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setUser((prevState) => ({
        ...prevState,
        [parent]: {
          ...prevState[parent],
          [child]: value,
        },
      }));
    } else {
      setUser((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleAddLanguage = (e) => {
    if (e.key === "Enter" || e.type === "click") {
      e.preventDefault();
      if (
        newLanguage &&
        !user.knownLanguages
          .map((lang) => lang.toLowerCase())
          .includes(newLanguage.toLowerCase())
      ) {
        setUser((prevState) => ({
          ...prevState,
          knownLanguages: [...prevState.knownLanguages, newLanguage],
        }));
        setNewLanguage("");
      }
    }
  };

  const handleRemoveLanguage = (language) => {
    setUser((prevState) => ({
      ...prevState,
      knownLanguages: prevState.knownLanguages.filter(
        (lang) => lang !== language
      ),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Profile created", user);
    navigate("/dashboard");
  };

  // Redirect to dashboard if user profile is already set up
  useEffect(() => {
    // Mock check for profile setup, replace with actual check
    const isProfileSetUp = true; // Replace with actual check logic
    if (!isProfileSetUp) {
      navigate("/");
    }
  }, []);

  return (
    <>
      {!isLoaded && <p>Loading...</p>}
      {isLoaded && (
        <>
        <div className="w-full flex justify-center bg-background drop-shadow-2xl">
            <Header />
        </div>
        <div className="min-h-screen bg-background text-primary_text p-4 flex justify-center items-center">
          <div className="w-full max-w-2xl bg-background p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-primary_text mb-6">
              Set Up Your Profile
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="mb-4">
                <label
                  className="block text-secondary_text mb-2"
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={user.name}
                  onChange={handleChange}
                  className="w-full p-3 border border-secondary rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-primary_text mb-2">
                  Known Languages
                </h3>
                <div className="flex flex-wrap gap-2">
                  {user.knownLanguages.map((language, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between bg-secondary p-2 rounded-lg"
                    >
                      <span className="mr-2">{language}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveLanguage(language)}
                        className="text-primary hover:text-tertiary transition duration-200"
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex mt-4">
                    <input
                    type="text"
                    value={newLanguage}
                    onChange={(e) => setNewLanguage(e.target.value)}
                    onKeyDown={handleAddLanguage}
                    className="w-full p-3 border border-secondary rounded-lg"
                    placeholder="Add a new language"
                    />
                    <button
                    type="button"
                    onClick={handleAddLanguage}
                    className="ml-2 flex items-center justify-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-background bg-primary hover:bg-border hover:text-primary transition duration-200 md:py-2 md:text-md md:px-5"
                    >
                    <FaPlus />
                    </button>
                </div>
              </div>
              <div className="mb-4">
                <label
                  className="block text-secondary_text mb-2"
                  htmlFor="bio"
                >
                  Bio
                </label>
                <textarea
                  id="bio"
                  name="bio"
                  value={user.bio}
                  onChange={handleChange}
                  className="w-full p-3 border border-secondary rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-primary_text mb-2">
                  Coding Profiles
                </h3>
                {Object.entries(user.codingProfiles).map(
                  ([site, url], index) => (
                    <div key={index} className="mb-4">
                      <label
                        className="block text-secondary_text mb-2"
                        htmlFor={site}
                      >
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
                  )
                )}
              </div>
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-primary_text mb-2">
                  Social Profiles
                </h3>
                {Object.entries(user.socialProfiles).map(
                  ([site, url], index) => (
                    <div key={index} className="mb-4">
                      <label
                        className="block text-secondary_text mb-2"
                        htmlFor={site}
                      >
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
                  )
                )}
              </div>
              <div className="flex space-x-4 mt-4">
                <button
                  type="submit"
                  className="bg-primary text-primary_text py-2 px-4 rounded-md font-medium hover:bg-border hover:text-primary transition duration-200"
                >
                  Save Profile
                </button>
              </div>
            </form>
          </div>
        </div>
        </>)}
    </>
  );
};

export default NewUserSetup;