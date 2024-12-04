import { motion } from "framer-motion";
import React from "react";

interface MoviesLoaderProps {
  itemCount?: number;
  width?: number;
  height?: number;
}

export const MoviesLoader: React.FC<MoviesLoaderProps> = ({
  itemCount = 4,
}) => (
  <motion.div
    className="w-full flex flex-col space-y-4 animate-pulse rounded-lg"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 1 }}
    aria-busy="true"
    aria-live="polite"
  >
    {Array.from({ length: itemCount }).map((_, index) => (
      <div
        key={index}
        className="w-full lg:w-64 h-80 lg:h-36 bg-gray-300 rounded-lg"
      />
    ))}
  </motion.div>
);

export default MoviesLoader;
