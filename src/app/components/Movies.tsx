"use client";

import React, { useState, Suspense } from "react";
import { MovieCategory } from "../../types/movieCategory";
import MovieCategorySelector from "./MovieCategorySelector";
import { MoviesLoader } from "./MoviesLoader";
import MoviesList from "./MoviesList";

const Movies: React.FC = () => {
  const [dropdownSelection, setDropdownSelection] = useState<MovieCategory>(
    MovieCategory.PopularMovies
  );

  return (
    <div className="flex flex-col items-center justify-center w-full space-y-4 text-white rounded-lg mt-8 lg:mt-0 lg:pr-20 mb-5 lg:mb-0">
      {/* Selector de categorías */}
      <MovieCategorySelector
        dropdownSelection={dropdownSelection}
        setDropdownSelection={setDropdownSelection}
      />

      {/* Contenedor de películas */}
      <div className="flex flex-col items-center justify-start space-y-4 h-fit lg:h-[calc(100vh-240px)] lg:max-h-full lg:overflow-y-auto p-3 lg:p-1">
        <Suspense fallback={<MoviesLoader />}>
          <MoviesList category={dropdownSelection === MovieCategory.PopularMovies ? "popular" : "myMovies"} />
        </Suspense>
      </div>
    </div>
  );
};

export default Movies;
