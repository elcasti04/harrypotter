import type { MovieType } from "../types/movie";

const API_URL = "https://harrypotterb.onrender.com/pelis";

export async function getMovies(): Promise<MovieType[]> {
  const res = await fetch(API_URL);
  return res.json();
}

export async function getMoviesBySaga(saga: string): Promise<MovieType[]> {
  const res = await fetch(`${API_URL}/saga/${encodeURIComponent(saga)}`);
  return res.json();
}

export async function getMovieById(id: string): Promise<MovieType> {
  const res = await fetch(`${API_URL}/${id}`);
  return res.json();
}
