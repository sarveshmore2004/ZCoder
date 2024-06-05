import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { SignedIn, SignedOut, UserButton, useAuth } from "@clerk/clerk-react";
import config from "../config/index.json";

const Header = () => {
  const { userId } = useAuth();
  const { navigation, company, callToAction } = config;
  const { name: companyName, logo } = company;

  return (
    <div className="navbar md:px-10 self-center items-center w-11/12">
      <div className="flex-1">
        <Link
          to="/"
          className="btn btn-ghost text-2xl font-bold text-primary hover:bg-primary/20"
        >
          ZCoder
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1 items-center gap-2">
          <div className="rounded-md shadow">
            <Link
              to="/dashboard"
              className="w-full flex items-center justify-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-primary_text bg-primary hover:bg-border hover:text-primary md:font-semibold md:py-2 md:text-md md:px-5"
            >
              Dashboard
            </Link>
          </div>
          <div className="rounded-md shadow">
            <Link
              to="/community"
              className="w-full flex items-center justify-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-primary_text bg-primary hover:bg-border hover:text-primary md:font-semibold md:py-2 md:text-md md:px-5"
            >
              Community
            </Link>
          </div>
          <SignedOut>
            <div className="rounded-md shadow">
              <Link
                to="/sign-in"
                className="w-full flex items-center justify-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-primary_text bg-primary hover:bg-border hover:text-primary md:font-semibold md:py-2 md:text-md md:px-5"
              >
                Sign In
              </Link>
            </div>
            <div className="rounded-md shadow">
              <Link
                to="/sign-up"
                className="w-full flex items-center justify-center px-3 py-2 border border-transparent text-sm font-medium rounded-md border-primary text-primary bg-background hover:bg-border hover:text-primary md:py-2 md:text-md md:px-5"
              >
                Sign Up
              </Link>
            </div>
          </SignedOut>
          <SignedIn>
            <div className="rounded-md shadow ml-1">
              <UserButton afterSignOutUrl="/" userProfileUrl={`/${userId}`} />
            </div>
          </SignedIn>
        </ul>
      </div>
    </div>
  );
};

export default Header;