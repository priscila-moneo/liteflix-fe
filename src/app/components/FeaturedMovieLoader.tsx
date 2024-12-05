import { motion } from "framer-motion";
import React from "react";

export const FeaturedMovieLoader = () => (
  <motion.div
    className="flex size-full animate-pulse flex-col items-center justify-end p-6 lg:h-screen lg:items-start lg:p-12"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 1 }}
  >
    <div className="mb-3 h-[30px] w-3/4 rounded-md bg-gray-300 lg:w-[200px]" />
    <div className="mb-3 h-[80px] w-full rounded-md bg-gray-300 lg:w-[450px]" />

    <div className="flex w-full flex-col space-y-3 lg:flex-row lg:space-x-3 lg:space-y-0">
      <div className="h-[50px] w-full rounded-md bg-gray-300 lg:w-[200px]" />
      <div className="h-[50px] w-full rounded-md bg-gray-300 lg:w-[200px]" />
    </div>
  </motion.div>
);

export default FeaturedMovieLoader;
