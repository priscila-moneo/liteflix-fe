"use client";

import FeaturedMovie from "./components/FeaturedMovie";
import Header from "./components/Header";
import Movies from "./components/Movies";

const Home = () => {
  return (
    <div className="flex flex-col lg:flex-row lg:space-x-4">
      <div className="h-fit w-full">
        <Header />
        <FeaturedMovie />
      </div>

      <div className="z-40 mt-0 flex w-full flex-col justify-center lg:min-h-screen lg:w-[30rem] lg:pt-14">
        <Movies />
      </div>
    </div>
  );
};

export default Home;
