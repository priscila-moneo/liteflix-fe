import axios from 'axios';
import { useQuery, useMutation } from 'react-query';
import { Movie } from '../../types/movie';

// Axios instance
const axiosInstance = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: process.env.NEXT_PUBLIC_API_KEY,
  },
});

// Internal API instance
const internalAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: { 'Content-Type': 'application/json' },
});

// Fetch featured movie
export const fetchFeaturedMovie = async (): Promise<Movie | null> => {
  try {
    const { data } = await axiosInstance.get('/movie/now_playing');
    const movies = data?.results || [];
    if (!movies.length) return null;
    const randomMovie = movies[Math.floor(Math.random() * movies.length)];
    return randomMovie ? { ...randomMovie, backdrop_path: randomMovie.backdrop_path } : null;
  } catch (error) {
    console.error('Error fetching featured movie:', error);
    return null;
  }
};

// Fetch popular movies
export const fetchPopularMovies = async (): Promise<Movie[]> => {
  try {
    const { data } = await axiosInstance.get('/movie/popular');
    const movies = data?.results || [];
    return movies.map((movie: { backdrop_path: string }) => ({
      ...movie,
      backdrop_path: movie.backdrop_path,
    }));
  } catch (error) {
    console.error('Error fetching popular movies:', error);
    return [];
  }
};

// Fetch user's movies
export const fetchMyMovies = async (): Promise<Movie[]> => {
  try {
    const { data } = await internalAxios.get('/movies');
    return data;
  } catch (error) {
    console.error('Error fetching my movies:', error);
    return [];
  }
};

// Add a new movie
export const addMovie = async (movieData: {
  title: string;
  backdrop_path: string;
  vote_average: string;
  release_date: string;
}) => {
  try {
    const { data } = await internalAxios.post('/movies', movieData);
    return data;
  } catch (error) {
    console.error('Error adding movie:', error);
    throw error;
  }
};

// Upload an image
export const uploadImage = async (file: File) => {
  try {
    const formData = new FormData();
    formData.append('image', file);

    const { data } = await internalAxios.post('/movies/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};

// React Query hooks
export const useFeaturedMovie = () =>
  useQuery('featuredMovie', fetchFeaturedMovie, { staleTime: 300000, cacheTime: 600000 });

export const usePopularMovies = () =>
  useQuery('popularMovies', fetchPopularMovies, { staleTime: 600000, cacheTime: 900000 });

export const useMyMovies = () =>
  useQuery('myMovies', fetchMyMovies, { staleTime: 300000, cacheTime: 600000 });

export const useUploadImage = () => useMutation(uploadImage);
