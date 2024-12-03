import { motion } from "framer-motion";
import React from "react";

export const FeaturedMovieLoader = () => (
  <motion.div
    className="w-full h-full lg:h-screen flex flex-col items-center lg:items-start justify-end animate-pulse p-6 lg:p-12"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 1 }}
  >
    <div className="w-3/4 lg:w-[200px] bg-gray-300 h-[30px] rounded-md mb-3" />
    <div className="w-full lg:w-[450px] bg-gray-300 h-[80px] rounded-md mb-3" />

    <div className="flex flex-col lg:flex-row lg:space-x-3 space-y-3 lg:space-y-0 w-full">
      <div className="w-full lg:w-[200px] bg-gray-300 h-[50px] rounded-md" />
      <div className="w-full lg:w-[200px] bg-gray-300 h-[50px] rounded-md" />
    </div>
  </motion.div>
);

export default FeaturedMovieLoader;
