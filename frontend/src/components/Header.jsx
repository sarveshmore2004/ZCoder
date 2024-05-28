import React, { Fragment } from "react";

import config from "../config/index.json";

const Menu = () => {
  const { navigation, company, callToAction } = config;
  const { name: companyName, logo } = company;

  return (
    <div className="navbar px-10 self-center  items-center w-11/12">
      <div className="flex-1">
        <a className="btn btn-ghost text-2xl font-bold text-primary">ZCoder</a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1 items-center gap-2">
          <div className="rounded-md shadow">
            <a
              href=""
              className={`w-full flex items-center justify-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-background bg-primary hover:bg-border hover:text-primary md:font-semibold md:py-2 md:text-md md:px-5`}
            >
              Sign In
            </a>
          </div>
          <div className="rounded-md shadow">
            <a
              href=""
              className={`w-full flex items-center justify-center px-3 py-2 border border-transparent text-sm font-medium rounded-md border-primary text-primary bg-background hover:bg-border hover:text-primary md:py-2 md:text-md md:px-5`}
            >
              Sign Up
            </a>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default Menu;
