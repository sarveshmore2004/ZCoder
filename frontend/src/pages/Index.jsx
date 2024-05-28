import { SignIn } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import MainHero from "../components/MainHero";
import Header from "../components/Header";
import MainHeroImage from "../components/MainHeroImage.jsx";
import Product from "../components/Product.jsx";
import About from "../components/About.jsx";
export default function IndexPage() {
  return (
    <div className={`bg-background flex flex-col gap-y-16 overflow-hidden`}>
      <Header />
      <div className={`relative bg-background `}>
        <div className="mt-8  relative flex flex-col w-full justify-around items-center lg:flex lg:flex-row">
          <div className={`w-5/6 sm:w-1/2 p-6 mt-1`}>
            <MainHero />
          </div>
          <MainHeroImage />
        </div>
      </div>
      <Product />
      <About />
    </div>
  );
}
