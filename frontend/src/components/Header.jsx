import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { SignedIn, SignedOut, useAuth, UserButton } from "@clerk/clerk-react";
import { FiBell, FiMenu, FiX } from "react-icons/fi";
import config from "../config/index.json";
import useFetchNotifications from "../hooks/useFetchNotifications";
import formatDate from "../utils/formatDate";
const Header = () => {
  const { userId, isLoaded } = useAuth();
  const { notifications, notiCount, loading } = useFetchNotifications(userId, isLoaded);
  const { navigation, company, callToAction } = config;
  const { name: companyName, logo } = company;

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isClearing, setIsClearing] = useState(false);
  const [notificationList, setNotificationList] = useState(notifications);
  const [notificationCount, setNotificationCount] = useState(notiCount);

  const [dropdownOpen ,setDropdownOpen] = useState(false);

  useEffect(() => {
    if (notifications) {
      setNotificationList(notifications);
    }
    if (notiCount !== undefined) {
      setNotificationCount(notiCount);
    }
  }, [notifications, notiCount]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const clearNotifications = async () => {
    setIsClearing(true);
    try {
      await fetch(`/api/users/${userId}/notifications`, { method: 'PUT' });
      setNotificationCount(0);
      setNotificationList([]);
    } catch (error) {
      console.error("Error clearing notifications:", error);
    } finally {
      setIsClearing(false);
    }
  };

  return (
    <div className="navbar md:px-5 self-center items-center">
      <div className="flex-1">
        <SignedOut>
          <Link to="/" className="btn btn-ghost text-2xl font-bold text-primary hover:text-secondary">
            ZCoder
          </Link>
        </SignedOut>
        <SignedIn>
          <Link to="/dashboard" className="btn btn-ghost text-2xl font-bold text-primary hover:text-secondary">
            ZCoder
          </Link>
        </SignedIn>
      </div>
      <div className="flex-none md:hidden dropdown dropdown-bottom dropdown-open dropdown-end">
        <button className={`btn btn-ghost text-primary text-2xl ${isMenuOpen && 'bg-primary/20'}`} onClick={toggleMenu}>
          {isMenuOpen ? <FiX /> : <FiMenu />}
        </button>
        {isMenuOpen && (
          <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-background outline outline-1 outline-primary/50 rounded-box w-52 items-center">
            <li>
              <Link to="/dashboard" className="w-full flex items-center justify-center px-3 py-2 text-sm font-medium text-primary_text hover:text-secondary">
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/community" className="w-full flex items-center justify-center px-3 py-2 text-sm font-medium text-primary_text hover:text-secondary">
                Community
              </Link>
            </li>
            <li>
              <Link to="/contests" className="w-full flex items-center justify-center px-3 py-2 text-sm font-medium text-primary_text hover:text-secondary">
                Contests
              </Link>
            </li>
            <SignedOut>
              <li>
                <Link to="/sign-in" className="w-full flex items-center justify-center px-3 py-2 text-sm font-medium text-primary hover:text-secondary">
                  Sign In
                </Link>
              </li>
              <li>
                <Link to="/sign-up" className="w-full flex items-center justify-center px-3 py-2 text-sm font-medium text-primary hover:text-secondary">
                  Sign Up
                </Link>
              </li>
            </SignedOut>
            <SignedIn>
              <li>
                <UserButton afterSignOutUrl="/" userProfileUrl={`/${userId}`} />
              </li>
            </SignedIn>
          </ul>
        )}
      </div>
      <div className="flex-none hidden md:flex md:items-center">
        <ul className="menu menu-horizontal px-1 md:items-center gap-2">
          <li className="mx-2">
            <Link to="/dashboard" className="text-primary_text hover:text-secondary text-sm font-medium md:font-semibold md:text-md">
              Dashboard
            </Link>
          </li>
          <li className="mx-2">
            <Link to="/community" className="text-primary_text hover:text-secondary text-sm font-medium md:font-semibold md:text-md">
              Community
            </Link>
          </li>
          <li className="mx-2">
            <Link to="/contests" className="text-primary_text hover:text-secondary text-sm font-medium md:font-semibold md:text-md">
              Contests
            </Link>
          </li>
          <SignedOut>
            <div className="rounded-md shadow">
              <Link to="/sign-in" className="w-full flex items-center justify-center px-3 py-2 border ml-1 border-transparent text-sm font-medium rounded-md text-primary_text bg-primary hover:bg-border hover:text-primary md:font-semibold md:py-2 md:text-md md:px-5">
                Sign In
              </Link>
            </div>
            <div className="rounded-md shadow">
              <Link to="/sign-up" className="w-full flex items-center justify-center px-3 py-2 border border-transparent text-sm font-medium rounded-md border-primary text-primary bg-background hover:bg-border hover:text-primary md:py-2 md:text-md md:px-5">
                Sign Up
              </Link>
            </div>
          </SignedOut>
          <SignedIn>
            <li className="mx-2">
              <UserButton afterSignOutUrl="/" userProfileUrl={`/${userId}`} />
            </li>
          </SignedIn>
        </ul>
      </div>
      <SignedIn>
        <div className="flex-none dropdown dropdown-bottom dropdown-end">
          <div tabIndex={0} className="m-1 btn relative" onClick={()=>setDropdownOpen(prev=> !prev)}>
            <FiBell />
            {notificationCount > 0 && (
              <span className="badge badge-error absolute top-0 right-0 px-2 py-1 text-xs font-bold leading-none text-red-100 rounded-full">
                {notificationCount}
              </span>
            )}
          </div>
          {
            dropdownOpen && 
            <ul tabIndex={0} className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-80">
              {!loading  && notificationList && notificationList.slice(notificationList.length - notificationCount, notificationList.length).map((notification, index) => (
                <li key={index} className="mb-2">
                  <Link to={`/dashboard/blog/${notification.postId}`} className="flex flex-col">
                    <span className="font-semibold">{notification.author.name}</span>
                    <span className="text-sm text-gray-600">{notification.content}</span>
                    <span className="text-xs text-gray-400">{formatDate(notification.date)}</span>
                    {notification.postId === notification.parentId ? (
                      <span className="text-sm">Replied to Your Post</span>
                    ) : (
                      <span className="text-sm">Replied to Your Comment</span>
                    )}
                  </Link>
                </li>
              ))}
              <li>
                <button onClick={clearNotifications} className="btn btn-ghost w-full">
                  {isClearing ? 'Clearing...' : 'Clear Notifications'}
                </button>
              </li>
            </ul>
          }
          
        </div>
      </SignedIn>
    </div>
  );
};

export default Header;
