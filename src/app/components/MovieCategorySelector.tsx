import React from "react";
import { MovieCategory } from "../../types/movieCategory";

interface MovieCategorySelectorProps {
  dropdownSelection: MovieCategory;
  setDropdownSelection: (value: MovieCategory) => void;
}

const dropdownOptions = [
  { label: "Populares", value: MovieCategory.PopularMovies },
  { label: "Mis Películas", value: MovieCategory.MyMovies },
];

const MovieCategorySelector: React.FC<MovieCategorySelectorProps> = ({
  dropdownSelection,
  setDropdownSelection,
}) => {
  return (
    <div className="flex items-center justify-center space-x-2">
      <label htmlFor="movie-category" className="font-light">
        Ver:
      </label>
      <select
        id="movie-category"
        value={dropdownSelection}
        onChange={(e) => setDropdownSelection(e.target.value as MovieCategory)}
        className="cursor-pointer border-0 bg-transparent p-0 uppercase text-white focus:outline-none"
      >
        {dropdownOptions.map(({ label, value }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default MovieCategorySelector;
