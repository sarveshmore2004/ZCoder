import React from "react";
import "./App.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

// Import the components
import IndexPage from "./pages/Index";
import SignInPage from "./pages/SignIn";
import SignUpPage from "./pages/SignUp";
import DashboardPage from "./pages/Dashboard";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import BlogDetailPage from "./pages/BlogDetailPage";
import AddPostPage from "./pages/AddPost";
import NewUserSetup from "./pages/NewUser";
import { Toaster } from "react-hot-toast";
import Community from "./pages/Community";
import EditPost from "./pages/EditPost";
import ContestsPage from "./pages/ContestsPage";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<IndexPage />} />
      <Route path="/sign-in/*" element={<SignInPage />} />
      <Route path="/sign-up/*" element={<SignUpPage />} />
      <Route path="/new-user" element={<NewUserSetup />} />
      <Route path="/:userid" element={<Profile />} />
      <Route path="/contests" element={<ContestsPage />} />
      <Route path="/:userid/edit" element={<EditProfile />} />
      <Route path="/community" element={<Community/>}/>
      <Route path="/dashboard">
        <Route index element={<DashboardPage />} />
        <Route path="blog/:id" element={<BlogDetailPage />} />
        <Route path="blog/:id/edit" element={<EditPost />} />
        <Route path="add-post" element={<AddPostPage />} />
      </Route>
    </Route>
  )
);

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  );
}

export default App;
