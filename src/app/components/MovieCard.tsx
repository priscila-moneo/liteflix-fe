import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";
import { PiPlayCircle, PiPlayCircleDuotone } from "react-icons/pi";
import Image from "next/image";
import { Movie } from "../../types/movie";

interface Props {
  movie: Movie;
  isPopular: boolean;
}

const fallbackImage = "/assets/images/fallback-image.jpg";

const imageBaseUrl = (isPopular: boolean) =>
  isPopular ? "https://image.tmdb.org/t/p/w500" : "http://localhost:3001/uploads/";

const cardVariants = {
  hover: { scale: 1.03, transition: { duration: 0.3 } },
};

export const MovieCard: React.FC<Props> = ({ movie, isPopular }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const handleImageLoad = () => setIsImageLoaded(true);

  return (
    <motion.div
      key={movie.id}
      className="relative w-full flex flex-col items-center max-h-30 cursor-pointer bg-gray-800/50 rounded-lg hover:bg-gray-700 group text-center hover:text-left"
      whileHover="hover"
      variants={cardVariants}
    >
      <div
        className={`relative w-full h-30 rounded-lg transition-opacity duration-500 ${isImageLoaded ? "opacity-100" : "opacity-0"}`}
      >
        <div
          className={`absolute inset-0 bg-gray-300 rounded-lg transition-opacity duration-500 ${isImageLoaded ? "opacity-0" : "opacity-100"}`}
        />
        <Image
          src={`${imageBaseUrl(isPopular)}${movie.backdrop_path}`}
          alt={`Imagen de la película ${movie.title}`}
          width={500} 
          height={300} 
          className="w-full max-h-30 object-cover rounded-lg transition-opacity duration-500"
          onLoadingComplete={handleImageLoad}
          onError={(e) => (e.currentTarget.src = fallbackImage)}
        />
        <div className="absolute inset-0 flex items-center rounded-lg justify-center group-hover:justify-start bg-black/50 opacity-70 transition-opacity duration-300">
          <PiPlayCircleDuotone
            className="rounded-full transition-all duration-300 group-hover:text-xl group-hover:left-0 group-hover:hidden size-[90px] lg:size-[45px]"
          />
        </div>
        <div className="absolute p-3 bottom-0 w-full text-white opacity-100 transition-opacity duration-300 flex flex-col items-center group-hover:items-start group-hover:opacity-100">
          <div className="flex flex-row items-center mb-5 lg:mb-0">
            <PiPlayCircle
              className="hidden mr-3 group-hover:left-0 group-hover:flex size-[45px] lg:size-[20px]"
            />
            <h4 className="text-4xl font-light text-center lg:text-base">{movie.title}</h4>
          </div>
          <div className="flex-row text-2xl lg:text-xl justify-between w-full items-center mt-2 hidden group-hover:flex opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="flex items-center space-x-1">
              <FaStar className="text-accent" />
              <span>{movie.vote_average}</span>
            </div>
            <span>{new Date(movie.release_date).getFullYear()}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
