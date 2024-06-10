import React from "react";

const About = () => {


  return (
      <div className="flex items-center justify-center pb-10">
          <p className="text-xs lg:text-sm leading-none text-gray-900 dark:text-gray-50">
            &copy; {new Date().getFullYear()} designed by{" "}
            <a href="https://github.com/sarveshmore2004/ZCoder" className=" text-primary" rel="nofollow">
              Sarvesh & Shivam
            </a>
          </p>
      </div>
  );
};
export default About;
