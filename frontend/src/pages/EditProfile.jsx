import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth, useUser } from "@clerk/clerk-react";
import { FaPlus } from "react-icons/fa";
import useUpdateUser from "../hooks/useUpdateUser.js";
import useFetchUserById from "../hooks/useFetchUserById.js";
import Spinner from "../components/spinner.jsx";
import { FcEditImage } from "react-icons/fc";
import toast from "react-hot-toast";

const EditProfile = () => {
  const { user: clerkUser , isLoaded:userLoaded} = useUser();
  const { userId, isLoaded } = useAuth();
  const { userid } = useParams();
  const navigate = useNavigate();
  const [showError, setShowError] = useState(false);
  const { user: fetchedUser, loading } = useFetchUserById(userid, true);
  const { user: updatedUser, updateUser } = useUpdateUser(userid);
  const [profilePicLoading , setProfilePicLoading] = useState(false)
  
  useEffect(() => {
    if (isLoaded && userId !== userid) {
      setShowError(true);
      setTimeout(() => {
        navigate(`/${userid}`);
      }, 2000); // Redirect after 2 seconds
    }

    if (fetchedUser) {
      setUser({
        ...user,
        name: fetchedUser.name || "",
        bio: fetchedUser.bio || "",
        avatar: fetchedUser.avatar || "",
        codingProfiles: fetchedUser.codingProfiles || {
          leetcode: "",
          codeforces: "",
          codechef: "",
          atcoder: "",
        },
        socialProfiles: fetchedUser.socialProfiles || {
          github: "",
          linkedin: "",
        },
        knownLanguages: fetchedUser.knownLanguages || [],
      });
    }
  }, [isLoaded, userId, userid, navigate, fetchedUser]);

  const [user, setUser] = useState({
    name: "",
    bio: "",
    avatar:"",
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
        newLanguage.trim() &&
        !user.knownLanguages
          .map((lang) => lang.toLowerCase())
          .includes(newLanguage.trim().toLowerCase())
      ) {
        setUser((prevState) => ({
          ...prevState,
          knownLanguages: [...prevState.knownLanguages, newLanguage.trim()],
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

  const handleCancel = () => {
    navigate(-1);
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
        const maxWidth = 300;
        const maxHeight = 300;
  
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
  
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
  
        // Convert the canvas image back to a base64 string
        const scaledBase64String = canvas.toDataURL(file.type);
  
        await clerkUser?.setProfileImage({ file: scaledBase64String });
        await clerkUser?.reload();
        setUser((prevState) => ({
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
    console.log(user);
    await updateUser(user);
    navigate(`/${userid}`);
  };
console.log(user)
  return (
    <>
      {(!isLoaded || loading) && <Spinner />}
      {isLoaded && fetchedUser && (
        <>
          <div className="w-full flex justify-center bg-background drop-shadow-2xl">
            <Header />
          </div>
          <div className="min-h-screen bg-background text-primary_text p-4 flex justify-center items-center">
            <div className="w-full max-w-2xl bg-background p-8 rounded-lg shadow-lg">
              <h2 className="text-2xl font-semibold text-primary_text mb-6">
                Edit Profile
              </h2>
              {showError && (
                <div className="bg-primary text-primary_text p-4 rounded mb-6">
                  Unauthorized access! Redirecting to the Profile...
                </div>
              )}
              {!showError && (
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
                    <label
                      className="block text-secondary_text mb-2"
                      htmlFor="name"
                    >
                      Name
                    </label>
                    <input
                      autoFocus
                      type="text"
                      id="name"
                      name="name"
                      value={user.name}
                      onChange={handleChange}
                      className="w-full p-3 border border-secondary rounded-lg"
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
                      Save Changes
                    </button>
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="bg-primary/10 text-primary_text py-2 px-4 rounded-md font-medium hover:bg-border hover:text-primary transition duration-200"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default EditProfile;
