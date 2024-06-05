import React from "react";

import config from "../config/index.json";
import { Link } from "react-router-dom";

const MainHero = () => {
  const { mainHero } = config;
  return (
    <main className="mx-auto px-4 ">
      <div className="sm:text-center lg:text-left">
        <h1 className="text-3xl tracking-tight font-extrabold text-primary_text sm:text-5xl lg:text-6xl">
          <span className="block xl:inline">{mainHero.title}</span>{" "}
          <span className={`block text-primary xl:inline`}>
            {mainHero.subtitle}
          </span>
        </h1>
        <p className="mt-3 text-sm text-secondary_text sm:mt-5 sm:max-w-xl sm:mx-auto lg:mx-0  sm:text-xl lg:text-xl">
          {mainHero.description}
        </p>
        <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
          <div className="rounded-md shadow">
            <Link
              to={mainHero.primaryAction.to}
              className={`w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-background bg-primary hover:bg-border hover:text-primary md:py-4 md:text-lg md:px-10`}
            >
              {mainHero.primaryAction.text}
            </Link>
          </div>
          <div className="mt-3 sm:mt-0 sm:ml-3">
            <Link
              to={mainHero.secondaryAction.to}
              className={`w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md border-primary text-secondary bg-background hover:bg-border hover:text-primary md:py-4 md:text-lg md:px-10`}
            >
              {mainHero.secondaryAction.text}
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default MainHero;
