# ZCoder

ZCoder is a platform that provides users with the ability to create profiles, bookmark coding problems along with their solutions, and engage in a collaborative environment through commenting on each other's solutions.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Screenshots](#screenshots)

## Project Overview

ZCoder aims to enhance collaborative learning and personalized coding experience by allowing users to:

- Create unique coding profiles.
- Bookmark coding problems and solutions.
- Engage in a collaborative environment through commenting on each other's solutions.
- Stay updated on upcoming coding contests and events.

## Features

- **Personalized Profiles**: Craft your unique coding identity and connect with others.
- **Collaborative Learning**: Engage in shared knowledge exchange and feedback on solutions.
- **Add Posts**: Post details about coding problems, including the question statement and its answer. Mark them as public or private.
- **Commenting System**: Comment on posts, upvote/downvote posts, and reply to comments.
- **Community Page**: View all users and their activities.
- **Contest Calendar**: View recent and upcoming contests.
- **Profile Pictures**: Add profile pictures and basic information related to competitive programming handles.
- **Recent Activity**: Track your posts, comments, and favorite problems.
- **Bookmarking**: Bookmark posts and view them later.
- **Notification Drawer**: Get notified about comments and replies.
- **Landing Page**: Introduction to the platform and its features.
- **Explain Button**: Get explanations for each post and comment using the Gemini API.
- **Edit Posts and Profiles**: Edit your posts and profile information.
- **Search Posts**: Search for specific posts by keywords.
- **Add Doubts**: Post your coding-related doubts for others to help solve.

## Tech Stack

- **Frontend**: ReactJS, Clerk (for authentication), Tailwind CSS, DaisyUI
- **Backend**: Node.js, Express.js
- **Database**: MongoDB

## Installation

To get a local copy up and running, follow these steps:

### Prerequisites

- Node.js and npm installed on your local machine.
- MongoDB installed and running.

```bash
git clone git@github.com:sarveshmore2004/ZCoder.git
cd ZCoder
npm install
```
Frontend Setup
- Navigate to the frontend directory.
```bash
cd frontend
npm install
```
- Create a .env.local file and add the following environment variables:
```
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
VITE_GEMINI_API_KEY=your_gemini_api_key
```
- Start the frontend development server.
```bash
npm run dev
```
Backend Setup
- Navigate to the Project root directory.
```bash
cd ..
```
- Create a .env file and add the following environment variables:
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
```
- Start the backend server.
```bash
npm start server
```


## Hosted Server

Link to hosted server: [https://zcoder.onrender.com/](https://zcoder.onrender.com/)


## Screenshots

**Profile Page**
![image](https://github.com/sarveshmore2004/ZCoder/assets/118593041/cd7560a1-d025-410a-8949-2ac9458e917e)


**Blogpost Page**
![image](https://github.com/sarveshmore2004/ZCoder/assets/118593041/40f0c8c2-e8fc-4d65-8a12-4b758beb137a)


**Dashboard Page**
![image](https://github.com/sarveshmore2004/ZCoder/assets/118593041/d6e56640-bafa-48d6-b954-95fbc49e2046)


**Contest Page**
![image](https://github.com/sarveshmore2004/ZCoder/assets/118593041/62160b3b-1377-4883-a0b9-abce45ad1de6)


**Community Page**
![image](https://github.com/sarveshmore2004/ZCoder/assets/118593041/991edc49-d60d-47d6-a8a5-4bf1e1452ea3)


**Add Post Page**
![image](https://github.com/sarveshmore2004/ZCoder/assets/118593041/66f1f6e4-4411-439f-b3ba-8306878bb0dd)


**Edit Post Page**
![image](https://github.com/sarveshmore2004/ZCoder/assets/118593041/49a53caf-7443-4b70-bdd3-848dc8f1ec62)


**Edit Profile Page**
![image](https://github.com/sarveshmore2004/ZCoder/assets/118593041/2fcbe16a-c4ef-465d-92a8-ef7416669ae5)


