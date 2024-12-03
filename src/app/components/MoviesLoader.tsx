import { motion } from "framer-motion";
import React from "react";

interface MoviesLoaderProps {
  itemCount?: number;
  width?: number;
  height?: number;
}

export const MoviesLoader: React.FC<MoviesLoaderProps> = ({
  itemCount = 4,
  width = 260,
  height = 150,
}) => (
  <motion.div
    className="w-full flex flex-col space-y-4 animate-pulse"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 1 }}
    aria-busy="true"
    aria-live="polite"
  >
    {Array.from({ length: itemCount }).map((_, index) => (
      <div
        key={index}
        className="w-full bg-gray-300 rounded-md"
        style={{
          width: `${width}px`,
          height: `${height}px`,
        }}
      />
    ))}
  </motion.div>
);

export default MoviesLoader;
