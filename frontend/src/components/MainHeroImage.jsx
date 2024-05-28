import React from "react";

import config from "../config/index.json";

const MainHeroImage = () => {
  const { mainHero } = config;
  return (
    <div className=" w-4/6 lg:mr-10 lg:w-96">
      <img
        className=" object-cover "
        src={mainHero.img}
        alt="happy team image"
      />
    </div>
  );
};

export default MainHeroImage;
