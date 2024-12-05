"use client";

import React, { useState, Suspense } from "react";
import { MovieCategory } from "../../types/movieCategory";
import MovieCategorySelector from "./MovieCategorySelector";
import { MoviesLoader } from "./MoviesListLoader";
import MoviesList from "./MoviesList";

const Movies: React.FC = () => {
  const [dropdownSelection, setDropdownSelection] = useState<MovieCategory>(
    MovieCategory.PopularMovies
  );

  return (
    <div className="mb-5 mt-8 flex w-full flex-col items-center justify-center space-y-4 rounded-lg text-white lg:my-0 lg:pr-20">
      {/* Selector de categorías */}
      <MovieCategorySelector
        dropdownSelection={dropdownSelection}
        setDropdownSelection={setDropdownSelection}
      />

      {/* Contenedor de películas */}
      <div className="flex h-fit w-full flex-col items-center justify-start space-y-4 p-6 lg:h-[calc(100vh-240px)] lg:max-h-full lg:overflow-y-auto lg:p-1">
        <Suspense fallback={<MoviesLoader />}>
          <MoviesList category={dropdownSelection} />
        </Suspense>
      </div>
    </div>
  );
};

export default Movies;
