"use client";

import { useEffect } from "react";
import { useMovieStore } from "../../store/movieStore";
import { useFeaturedMovie } from "../services/movieApi.service";
import { motion } from "framer-motion";
import { FeaturedMovieLoader } from "./FeaturedMovieLoader";
import { PiPlay, PiPlus } from "react-icons/pi";
import { Movie } from "@/types/movie";
import Image from "next/image";

const FeaturedMovie = () => {
  const setFeaturedMovie = useMovieStore(
    (state: { setFeaturedMovie: (movie: Movie) => void }) =>
      state.setFeaturedMovie
  );
  const { data: featuredMovie, isLoading } = useFeaturedMovie();

  useEffect(() => {
    if (featuredMovie) {
      setFeaturedMovie(featuredMovie);
    }
  }, [featuredMovie, setFeaturedMovie]);

  return (
    <div className="relative flex h-dvh w-full flex-col justify-end lg:absolute lg:h-full">
      {isLoading ? (
        <FeaturedMovieLoader />
      ) : (
        featuredMovie && (
          <>
            {/* Imagen con animación */}
            <motion.div
              className="absolute inset-0 z-0"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1  }}
              transition={{ duration: 1, ease: "easeInOut" }}
            >
              <Image
                className="size-full object-cover"
                src={`https://image.tmdb.org/t/p/w1280${
                  featuredMovie.backdrop_path || featuredMovie.poster_path
                }`}
                alt={featuredMovie.title}
                fill
                priority
                fetchPriority="high"
                sizes="(max-width: 1024px) 100vw, 1280px"
              />
            </motion.div>

            {/* Overlay para estética */}
            <div className="absolute inset-0 z-10 hidden bg-[#242424]/50 lg:flex"></div>
            <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#242424] via-[rgba(36,36,36,0.5)] to-[rgba(36,36,36,0.5)] lg:hidden"></div>

            {/* Contenido principal */}
            <motion.div
              className="relative z-20 p-5 text-white lg:p-16"
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <h2 className="flex items-center justify-center text-base sm:text-2xl lg:justify-start">
                <span className="mr-2 font-thin">Original de </span> LITEFLIX
              </h2>
              <h3 className="text-accent flex w-full items-center justify-center break-words text-center text-6xl font-bold tracking-[16px] md:text-9xl lg:w-3/4 lg:justify-start lg:text-left">
                {featuredMovie.title}
              </h3>
              <div className="mt-4 flex flex-col space-y-4 pb-5 lg:flex-row lg:space-x-4 lg:space-y-0 lg:pb-0">
                <motion.button
                  className="btn"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <PiPlay className="mr-2" /> Reproducir
                </motion.button>
                <motion.button
                  className="btn btn-outlined"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <PiPlus className="mr-2" /> Mi lista
                </motion.button>
              </div>
            </motion.div>
          </>
        )
      )}
    </div>
  );
};

export default FeaturedMovie;
