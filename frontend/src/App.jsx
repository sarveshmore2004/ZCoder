import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { RedirectToSignIn, SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from "react-router-dom";
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route index element={<Home />}/>
      <Route path="/dashboard" element={
        <>
          <SignedIn>
            <Dashboard />
          </SignedIn>
          
          <SignedOut>
            <RedirectToSignIn />
          </SignedOut>
        </>}
      />
    </>
  )
)

function App() {

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
