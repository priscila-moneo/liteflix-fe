import { create } from 'zustand';
import { Movie } from '../types/movie'

interface MovieStore {
  featuredMovie: Movie | null
  popularMovies: Movie[]
  addMovie: (movie: Movie) => void
  setFeaturedMovie: (movie: Movie) => void
  setPopularMovies: (movies: Movie[]) => void
}

export const useMovieStore = create<MovieStore>((set) => ({
  featuredMovie: null,
  popularMovies: [],
  addMovie: (movie: Movie) =>
    set((state) => ({ popularMovies: [...state.popularMovies, movie] })),
    setFeaturedMovie: (movie: Movie) => set({ featuredMovie: movie }),
    setPopularMovies: (movies: Movie[]) => set({ popularMovies: movies }),
}))

