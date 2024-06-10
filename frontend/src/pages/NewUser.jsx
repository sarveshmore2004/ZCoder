import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth, useUser } from "@clerk/clerk-react";
import { FaPlus } from "react-icons/fa";
import useCreateUser from "../hooks/useCreateUser.js";
import useFetchUserById from "../hooks/useFetchUserById.js";
import Spinner from "../components/spinner.jsx";
import { FcEditImage } from "react-icons/fc";
import toast from "react-hot-toast";

const NewUserSetup = () => {
  const { userId, isLoaded } = useAuth();
  const { user: clerkUser , isLoaded:userLoaded } = useUser();
  const { user, loading } = useFetchUserById(userId, isLoaded);
  const { createUser, loading: creatingUser } = useCreateUser();
  const navigate = useNavigate();
  const [profilePicLoading , setProfilePicLoading] = useState(false)

  const [formData, setFormData] = useState({
    clerkId: userId,
    name: "",
    bio: "",
    avatar: "",
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

  useEffect(() => {
    if (isLoaded && !loading && user) {
      navigate("/dashboard");
    }
  }, [isLoaded, loading, user, navigate]);

  useEffect(() => {
    if (userLoaded && clerkUser) {
      setFormData((prevState) => ({
        ...prevState,
        avatar: clerkUser?.imageUrl,
      }));
    }
  }, [clerkUser , userLoaded]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prevState) => ({
        ...prevState,
        [parent]: {
          ...prevState[parent],
          [child]: value,
        },
      }));
    } else {
      setFormData((prevState) => ({
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
        !formData.knownLanguages
          .map((lang) => lang.toLowerCase())
          .includes(newLanguage.toLowerCase())
      ) {
        setFormData((prevState) => ({
          ...prevState,
          knownLanguages: [...prevState.knownLanguages, newLanguage],
        }));
        setNewLanguage("");
      }
    }
  };

  const handleRemoveLanguage = (language) => {
    setFormData((prevState) => ({
      ...prevState,
      knownLanguages: prevState.knownLanguages.filter(
        (lang) => lang !== language
      ),
    }));
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
  
    const reader = new FileReader();
    reader.onloadend = async () => {
      setProfilePicLoading(true);
      const base64String = reader.result;
  
      // Create an image element
      const img = new Image();
      img.onload = async () => {
        const maxWidth = 640;
        const maxHeight = 640;
  
        let width = img.width;
        let height = img.height;
        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height *= maxWidth / width));
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width *= maxHeight / height));
            height = maxHeight;
          }
        }
  
        // Create a canvas element to draw the scaled image
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
  
        // Convert the canvas image back to a base64 string
        const scaledBase64String = canvas.toDataURL(file.type);
  
        await clerkUser?.setProfileImage({ file: scaledBase64String });
        await clerkUser?.reload();
        setFormData((prevState) => ({
          ...prevState,
          avatar: clerkUser?.imageUrl,
        }));
        console.log(user)
        setProfilePicLoading(false);
        toast.success('Profile Pic Updated');
      };
      img.src = base64String;
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      ...formData,
      clerkId: userId,
    };
    console.log(userData)
    try {
      await createUser(userData);
      navigate("/dashboard");
    } catch (error) {
      console.error("Failed to create user:", error);
    }
  };

  return (
    <>
      {!isLoaded || loading ? (
        <Spinner />
      ) : (
        <div className="min-h-screen bg-background text-primary_text p-4 flex justify-center items-center">
          <div className="w-full max-w-2xl bg-background p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-primary_text mb-6">
              Set Up Your Profile
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex items-center space-x-4 mb-4">
                <label className="flex flex-col items-center">
                  <span className="text-primary_text mb-2">Profile Image</span>
                  <input type="file" onChange={handleImageUpload} className="hidden" />
                  {profilePicLoading && <p className="text-primary">Uploading...</p>  }
                  {clerkUser?.imageUrl && (
                    <div className="relative ">
                    <img
                      src={clerkUser?.imageUrl}
                      alt="Profile"
                      className="w-28 h-28 object-cover rounded-full cursor-pointer"
                    />
                    <FcEditImage className="absolute right-0 top-0 cursor-pointer"/>
                    </div>
                  )}
                </label>
              </div>
              <div className="mb-4">
                <label className="block text-secondary_text mb-2" htmlFor="name">
                  Name
                </label>
                <input
                  autoFocus
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
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
                  {formData.knownLanguages.map((language, index) => (
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
                <label className="block text-secondary_text mb-2" htmlFor="bio">
                  Bio
                </label>
                <textarea
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  className="w-full p-3 border border-secondary rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-primary_text mb-2">
                  Coding Profiles
                </h3>
                {Object.entries(formData.codingProfiles).map(([site, url], index) => (
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
                <h3 className="text-lg font-semibold text-primary_text mb-2">
                  Social Profiles
                </h3>
                {Object.entries(formData.socialProfiles).map(([site, url], index) => (
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
                  className="bg-primary text-primary_text py-2 px-4 rounded-md font-medium hover:bg-border hover:text-primary transition duration-200"
                  disabled={creatingUser}
                >
                  {creatingUser ? "Saving..." : "Save Profile"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default NewUserSetup;
