import React from "react";
import { MovieCategory } from "../../types/movieCategory";
import { usePopularMovies, useMyMovies } from "../services/movieApi.service";
import { MovieCard } from "./MovieCard";
import { motion } from "framer-motion";
import { Movie } from "@/types/movie";
import MoviesLoader from "./MoviesListLoader";

interface MoviesListProps {
  category: MovieCategory;
}

const MoviesList: React.FC<MoviesListProps> = ({ category }) => {
  const { data, isLoading, isError } =
    category === MovieCategory.PopularMovies ? usePopularMovies() : useMyMovies();

  if (isLoading) {
    return <div className="flex justify-center w-full items-center"><MoviesLoader /></div>;
  }

  if (isError) {
    return (
      <p className="text-red-500">
        Error al cargar {category === MovieCategory.PopularMovies ? "Populares" : "Mis Películas"}.
      </p>
    );
  }
  const movies = category === MovieCategory.PopularMovies ? data?.slice(0, 4) : data;

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
            isPopular={category === MovieCategory.PopularMovies}
          />
        </motion.div>
      ))}
    </>
  );
};

export default MoviesList;