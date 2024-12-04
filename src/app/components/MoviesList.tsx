import React from "react";
import { usePopularMovies, useMyMovies } from "../services/movieApi.service";
import { MovieCard } from "./MovieCard";
import { motion } from "framer-motion";
import { Movie } from "@/types/movie";
import MoviesLoader from "./MoviesListLoader";

interface MoviesListProps {
  category: "popular" | "myMovies";
}

const MoviesList: React.FC<MoviesListProps> = ({ category }) => {
  const { data, isLoading, isError } =
    category === "popular" ? usePopularMovies() : useMyMovies();

  if (isLoading) {
    return <div className="flex justify-center items-center"><MoviesLoader /></div>;
  }

  if (isError) {
    return (
      <p className="text-red-500">
        Error al cargar {category === "popular" ? "películas populares" : "mis películas"}.
      </p>
    );
  }
  const movies = category === "popular" ? data?.slice(0, 4) : data;

  return (
    <>
      {movies?.map((movie: Movie) => (
        <motion.div
          key={movie.id || movie.title}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full"
        >
          <MovieCard
            movie={movie}
            isPopular={category === "popular"}
          />
        </motion.div>
      ))}
    </>
  );
};

export default MoviesList;
