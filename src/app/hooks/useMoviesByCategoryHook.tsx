import { usePopularMovies, useMyMovies } from "@/app/services/movieApi.service";
import { MovieCategory } from "@/types/movieCategory";

export const useMoviesByCategory = (category: MovieCategory) => {
  const popularMovies = usePopularMovies();
  const myMovies = useMyMovies();

  if (category === MovieCategory.PopularMovies) {
    return popularMovies;
  } else {
    return myMovies;
  }
};
