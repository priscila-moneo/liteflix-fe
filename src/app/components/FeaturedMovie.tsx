"use client";

import { useEffect } from "react";
import { useMovieStore } from "../../store/movieStore";
import { useFeaturedMovie } from "../services/movieApi.service";
import { motion } from "framer-motion";
import { FeaturedMovieLoader } from "./FeaturedMovieLoader";
import { PiPlay, PiPlus } from "react-icons/pi";
import { Movie } from "@/types/movie";

const FeaturedMovie = () => {
  const setFeaturedMovie = useMovieStore(
    (state: { setFeaturedMovie: (movie: Movie) => void }) =>
      state.setFeaturedMovie
  );
  const { data, isLoading } = useFeaturedMovie();

  useEffect(() => {
    if (data) {
      setFeaturedMovie(data);
    }
  }, [data, setFeaturedMovie]);

  return (
    <div className="relative lg:absolute w-full h-dvh lg:h-full flex flex-col justify-end">
      {isLoading ? (
        <FeaturedMovieLoader />
      ) : (
        data && (
          <>
            <motion.img
              className="object-cover w-full h-full absolute top-0 left-0 z-0"
              src={`https://image.tmdb.org/t/p/w1280${data.backdrop_path || data.poster_path}`}
              alt={data.title}
              loading="lazy"
              initial={{ opacity: 1, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
            />

            <div className="hidden lg:flex absolute inset-0 bg-[#242424] opacity-50 z-10"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#242424] via-[rgba(36,36,36,0.5)] to-[rgba(36,36,36,0.5)] z-10 lg:hidden"></div>

            <motion.div
              className="relative text-white p-5 lg:p-16 z-20"
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <h6 className="flex items-center justify-center lg:justify-start text-md sm:text-2xl">
                <span className="font-thin mr-2">Original de </span> LITEFLIX
              </h6>
              <h3 className="flex items-center justify-center lg:justify-start tracking-[16px] text-accent text-6xl md:text-9xl font-bold w-full lg:w-3/4 break-words">
                {data.title}
              </h3>
              <div className="mt-4 flex space-y-4 lg:space-x-4 lg:space-y-0 flex-col lg:flex-row pb-5 lg:pb-0">
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
