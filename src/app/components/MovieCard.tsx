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
  isPopular ? "https://image.tmdb.org/t/p/w780" : "";

const imageBaseUrlMobile = (isPopular: boolean) =>
  isPopular ? "https://image.tmdb.org/t/p/w500" : "";

const cardVariants = {
  hover: { scale: 1.03, transition: { duration: 0.3 } },
};

export const MovieCard: React.FC<Props> = ({ movie, isPopular }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const handleImageLoad = () => setIsImageLoaded(true);

  const getTitleLength = () => (window.innerWidth < 1024 ? 30 : 20);

  return (
    <motion.div
      key={movie.id}
      className="relative w-full flex flex-col items-center max-h-30 cursor-pointer bg-gray-800/50 rounded-lg hover:bg-gray-700 group text-center hover:text-left"
      whileHover="hover"
      variants={cardVariants}
    >
      <div
        className={`relative w-full h-0 pb-[33.33%] rounded-lg transition-opacity duration-500 ${isImageLoaded ? "opacity-100" : "opacity-0"}`}
        style={{ position: 'relative', paddingBottom: '56.25%' }}
      >
        {/* Imagen */}
        <div
          className={`absolute inset-0 w-full bg-gray-300 rounded-lg transition-opacity duration-500 ${isImageLoaded ? "opacity-0" : "opacity-100"}`}
        />
        <Image
          src={`${window.innerWidth < 1024 ? imageBaseUrlMobile(isPopular) : imageBaseUrl(isPopular)}${movie.backdrop_path || movie.poster_path}`}
          alt={`Imagen de la película ${movie.title}`}
          layout="fill"
          objectFit="cover"
          className="rounded-lg transition-opacity duration-500"
          onLoadingComplete={handleImageLoad}
          onError={(e) => (e.currentTarget.src = fallbackImage)}
          sizes="(max-width: 1024px) 500px, 780px"
        />
        
        {/* Play */}
        <div className="absolute inset-0 flex rounded-lg items-center justify-center group-hover:justify-start bg-black/50 opacity-70 transition-opacity duration-300">
          <PiPlayCircleDuotone
            className="rounded-full transition-all duration-300 group-hover:text-xl group-hover:left-0 group-hover:hidden size-[45px] md:size-[90px] lg:size-[45px]"
          />
        </div>

        {/* Info Película */}
        <div className="absolute p-3 bottom-0 w-full text-white opacity-100 transition-opacity duration-300 flex flex-col items-center group-hover:items-start group-hover:opacity-100">
          <div className="flex flex-row items-center mb-5 lg:mb-0">
            <PiPlayCircle
              className="hidden mr-3 group-hover:left-0 group-hover:flex size-[45px] lg:size-[20px]"
            />
            <h4 className="text-2xl md:text-4xl font-light text-center lg:text-base truncate">
              {movie.title.length > getTitleLength()
                ? `${movie.title.slice(0, getTitleLength())}...`
                : movie.title}
            </h4>
          </div>
          
          {/* Calificación y Año de lanzamiento */}
          <div className="flex-row text-2xl lg:text-xl justify-between w-full items-center mt-2 hidden group-hover:flex opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="flex items-center space-x-1">
              <FaStar className="text-accent" />
              <span>{isNaN(movie.vote_average) ? 0 : movie.vote_average}</span>
            </div>
            <span>{movie.release_date ? new Date(movie.release_date).getFullYear() : '-'}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};