// import { UserProfile } from '@clerk/clerk-react'
// import React from 'react'
// import { Link } from 'react-router-dom'

// function Profile() {
//   return (
//     <>
//      {/* <UserProfile /> */}
//       <Link to="/">Return to index</Link>
//       <p>nothing here</p>
//     </>
//   )
// }

// export default Profile

"use client";

import { UserButton } from "@clerk/clerk-react";

const DotIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      fill="currentColor"
    >
      <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z" />
    </svg>
  )
}

const CustomPage = () => {
  return (
    <div>
      <h1>Custom Profile Page</h1>
      <p>This is the custom profile page</p>
    </div>
  );
};

const Profile = () => (
  <header>
    <UserButton afterSignOutUrl='/'>
      <UserButton.UserProfilePage
        label="Custom Page"
        url="custom"
        labelIcon={<DotIcon />}
      >
        <CustomPage />
      </UserButton.UserProfilePage>
      <UserButton.UserProfileLink
        label="Homepage"
        url="/"
        labelIcon={<DotIcon />}
      />
      <UserButton.UserProfilePage label="account" />
      <UserButton.UserProfilePage label="security" />
    </UserButton>
  </header>
);

export default Profile;