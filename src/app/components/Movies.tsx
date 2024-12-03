"use client";

import React, { useState, useEffect } from "react";
import { MovieCard } from "./MovieCard";
import { MoviesLoader } from "./MoviesLoader";
import { useMyMovies, usePopularMovies } from "../services/movieApi";
import { Movie } from "../../types/movie";
import { motion } from "framer-motion";
import { MovieCategory } from "../../types/movieCategory";
import MovieCategorySelector from "./MovieCategorySelector";

const Movies: React.FC = () => {
  const [dropdownSelection, setDropdownSelection] = useState<MovieCategory>(
    MovieCategory.PopularMovies
  );

  const {
    data: popularMovies,
    isLoading: isLoadingPopularMovies,
    isError: isErrorPopularMovies,
  } = usePopularMovies();

  const {
    data: myMovies,
    isLoading: isLoadingMyMovies,
    isError: isErrorMyMovies,
  } = useMyMovies();

  const [moviesToShow, setMoviesToShow] = useState<Movie[] | undefined>([]);

  const isLoading = isLoadingPopularMovies || isLoadingMyMovies;
  const isError = isErrorPopularMovies || isErrorMyMovies;

  useEffect(() => {
    if (dropdownSelection === MovieCategory.PopularMovies) {
      setMoviesToShow(popularMovies?.slice(0, 4) || []);
    } else if (dropdownSelection === MovieCategory.MyMovies) {
      setMoviesToShow(myMovies || []);
    }
  }, [dropdownSelection, popularMovies, myMovies]);

  return (
<div className="flex flex-col items-center justify-center w-full space-y-4 text-white rounded-lg mt-8 lg:mt-0 lg:pr-20 mb-5 lg:mb-0">
  {/* Dropdown para cambiar entre "Populares" y "Mis Películas" */}
  <MovieCategorySelector
    dropdownSelection={dropdownSelection}
    setDropdownSelection={setDropdownSelection}
  />

  {/* Contenedor de películas */}
  <div className="flex flex-col items-center justify-start space-y-4 h-fit lg:h-[calc(100vh-240px)] lg:max-h-full lg:overflow-y-auto p-3 lg:p-1">
    {isLoading ? (
      <MoviesLoader />
    ) : isError ? (
      <p className="text-red-500">Error al cargar las películas.</p>
    ) : (
      moviesToShow?.map((movie: Movie) => (
        <motion.div
          key={movie.id || `${movie.title}-${movie.release_date}`}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <MovieCard
            movie={movie}
            isPopular={dropdownSelection === MovieCategory.PopularMovies}
          />
        </motion.div>
      ))
    )}
  </div>
</div>

  );
};

export default Movies;
