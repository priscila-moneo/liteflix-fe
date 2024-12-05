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
    className="flex w-full animate-pulse flex-col space-y-4 rounded-lg"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 1 }}
    aria-busy="true"
    aria-live="polite"
  >
    {Array.from({ length: itemCount }).map((_, index) => (
      <div
        key={index}
        className="h-[25vh] w-full rounded-lg bg-gray-300 lg:h-36 lg:w-64"
      />
    ))}
  </motion.div>
);

export default MoviesLoader;
