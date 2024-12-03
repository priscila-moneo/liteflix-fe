import axios from 'axios';
import { useQuery, useMutation } from 'react-query';
import { Movie } from '../../types/movie';

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const EXTERNAL_BASE_URL = 'https://api.themoviedb.org/3';
const INTERNAL_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const fetchFeaturedMovie = async (): Promise<Movie | null> => {
  const response = await axios.get(`${EXTERNAL_BASE_URL}/movie/now_playing?api_key=${API_KEY}`);
  const movies = response.data.results;
  const movie = movies[Math.floor(Math.random() * movies.length)];
  return movie ? { ...movie, backdrop_path: movie.backdrop_path } : null;
};

export const fetchPopularMovies = async (): Promise<Movie[]> => {
  const response = await axios.get(`${EXTERNAL_BASE_URL}/movie/popular?api_key=${API_KEY}`);
  const movies = response.data.results;
  return movies.map((movie: { backdrop_path: string }) => ({
    ...movie,
    backdrop_path: movie.backdrop_path,
  }));
};

export const fetchMyMovies = async () => {
  const response = await axios.get(`${INTERNAL_BASE_URL}/movies`);
  return response.data;
};

export const addMovie = async (movieData: { title: string; backdrop_path: string; vote_average: string; release_date: string }) => {
  const response = await axios.post(`${INTERNAL_BASE_URL}/movies`, movieData);
  return response.data;
};

export const uploadImage = async (file: File) => {
  const formData = new FormData();
  formData.append('image', file);

  const response = await axios.post(`${INTERNAL_BASE_URL}/movies/upload`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  if (!response.data) {
    throw new Error('Error al subir la imagen');
  }

  return response.data;
};

export const useFeaturedMovie = () => {
  return useQuery('featuredMovie', fetchFeaturedMovie);
};

export const usePopularMovies = () => {
  return useQuery('popularMovies', fetchPopularMovies);
};

export const useMyMovies = () => {
  return useQuery('myMovies', fetchMyMovies);
};

export const useUploadImage = () => {
  return useMutation(uploadImage, {
    onSuccess: (data) => {
      console.log('Imagen subida con éxito:', data);
    },
    onError: (error: Error) => {
      console.error('Error al subir la imagen:', error);
    },
  });
};
