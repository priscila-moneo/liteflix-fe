'use client';

import FeaturedMovie from './components/FeaturedMovie';
import Header from './components/Header';
import Movies from './components/Movies';

const Home = () => {
  return (
    <div className="flex flex-col lg:flex-row lg:space-x-4">
      <div className="w-full h-fit">
        <Header/>
        <FeaturedMovie />
      </div>

      <div className="flex flex-col w-full lg:w-[30rem] mt-0 z-40 justify-center lg:min-h-screen lg:pt-14">
        <Movies />
      </div>
    </div>
  );
};

export default Home;
