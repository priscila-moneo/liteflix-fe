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
      className="group relative flex w-full cursor-pointer flex-col items-center rounded-lg bg-gray-800/50 text-center hover:bg-gray-700 hover:text-left overflow-hidden"
      whileHover="hover"
      variants={cardVariants}
    >
      <div
        className={`relative h-0 w-full rounded-lg pb-[33.33%] transition-opacity duration-500 ${
          isImageLoaded ? "opacity-100" : "opacity-0"
        }`}
        style={{ position: "relative", paddingBottom: "56.25%" }}
      >
        {/* Imagen */}
        <div
          className={`absolute inset-0 w-full rounded-lg transition-opacity duration-500 ${
            isImageLoaded ? "bg-gray-300/0" : "bg-gray-300"
          }`}
        />
        <Image
          src={`${
            window.innerWidth < 1024
              ? imageBaseUrlMobile(isPopular)
              : imageBaseUrl(isPopular)
          }${movie.backdrop_path || movie.poster_path}`}
          alt={`Imagen de la película ${movie.title}`}
          layout="fill"
          objectFit="cover"
          className="rounded-lg transition-opacity duration-500"
          onLoadingComplete={handleImageLoad}
          onError={(e) => (e.currentTarget.src = fallbackImage)}
          sizes="(max-width: 1024px) 500px, 780px"
        />

        {/* Play */}
        <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-black/50 opacity-70 transition-opacity duration-300 group-hover:justify-start">
          <PiPlayCircleDuotone className="size-[45px] rounded-full transition-all duration-300 group-hover:left-0 group-hover:hidden group-hover:text-xl md:size-[90px] lg:size-[45px]" />
        </div>

        {/* Info Película */}
        <div className="absolute bottom-0 flex w-full flex-col items-center p-3 text-white opacity-100 transition-opacity duration-300 group-hover:items-start group-hover:opacity-100">
          <div className="mb-5 flex flex-row items-center lg:mb-0">
            <PiPlayCircle className="mr-3 hidden size-[45px] group-hover:left-0 group-hover:flex lg:size-[20px]" />
            <h4 className="truncate text-center text-2xl font-light md:text-4xl lg:text-base">
              {movie.title.length > getTitleLength()
                ? `${movie.title.slice(0, getTitleLength())}...`
                : movie.title}
            </h4>
          </div>

          {/* Calificación y Año de lanzamiento */}
          <div className="mt-2 hidden w-full flex-row items-center justify-between text-2xl opacity-0 transition-opacity duration-300 group-hover:flex group-hover:opacity-100 lg:text-xl">
            <div className="flex items-center space-x-1">
              <FaStar className="text-accent" />
              <span>{isNaN(movie.vote_average) ? 0 : movie.vote_average}</span>
            </div>
            <span>
              {movie.release_date
                ? movie.release_date.length === 4
                  ? movie.release_date
                  : new Date(movie.release_date).getFullYear()
                : "-"}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
