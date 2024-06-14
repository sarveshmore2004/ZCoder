# ZCoder

ZCoder is a platform that provides users with the ability to create profiles, bookmark coding problems along with their solutions, and engage in a collaborative environment through commenting on each other's solutions.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)

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
- **Explain Button**: Get explanations for each post and comment using the Gemini Flash 1.5 API.
- **Edit Posts and Profiles**: Edit your posts and profile information.
- **Search Posts**: Search for specific posts by keywords.
- **Add Doubts**: Post your coding-related doubts for others to help solve.

## Tech Stack

- **Frontend**: ReactJS, Next.js, Clerk (for authentication), Tailwind CSS, DaisyUI
- **Backend**: Node.js
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
Navigate to the frontend directory.
```bash
cd frontend
npm install
```
Create a .env.local file and add the following environment variables:
```
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
VITE_GEMINI_API_KEY=your_gemini_api_key
```
Start the frontend development server.
```bash
npm run dev
```
Backend Setup
Navigate to the backend directory.
```bash
cd backend
```
Create a .env file and add the following environment variables:
```
PORT=your_port_number
MONGO_URI=your_mongodb_connection_string
```
Start the backend server.
```bash
npm start server
```
Visit the Website at http://localhost:3000
