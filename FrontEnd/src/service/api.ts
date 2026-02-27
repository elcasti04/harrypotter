import type { Movie } from "../types/movie";

const API_URL = "http://localhost:3000/pelis";

export async function getMovies(): Promise<Movie[]> {
  const res = await fetch(API_URL);
  return res.json();
}

export async function getMoviesBySaga(saga: string): Promise<Movie[]> {
  const res = await fetch(`${API_URL}/saga/${encodeURIComponent(saga)}`);
  return res.json();
}

export async function getMovieById(id: string): Promise<Movie> {
  const res = await fetch(`${API_URL}/${id}`);
  return res.json();
}
