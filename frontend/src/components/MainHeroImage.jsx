import React from "react";

import config from "../config/index.json";

const MainHeroImage = () => {
  const { mainHero } = config;
  return (
    <div className="w-4/5 md:w-3/5 lg:w-2/5">
      <img
        className=" object-cover "
        src={mainHero.img}
        alt="happy team image"
      />
    </div>
  );
};

export default MainHeroImage;
