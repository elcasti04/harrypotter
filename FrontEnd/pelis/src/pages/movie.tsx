import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMovieById } from '../service/api';
import type { Movie } from '../types/movie';

function Movie() {
	const { id } = useParams();
	const navigate = useNavigate();
	const [movie, setMovie] = useState<Movie | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (id) {
			getMovieById(id)
				.then((data) => {
					setMovie(data);
					setLoading(false);
				})
				.catch((err) => {
					console.error('Error al cargar la película:', err);
					setError('Error al cargar la película');
					setLoading(false);
				});
		}
	}, [id]);

	if (loading) {
		return (
			<div className="container">
				<button onClick={() => navigate('/')} className="btn">
					← Volver
				</button>
				<div className="loading">
					<span>Cargando...</span>
				</div>
			</div>
		);
	}

	if (error || !movie) {
		return (
			<div className="container">
				<button onClick={() => navigate('/')} className="btn">
					← Volver
				</button>
				<div className="error">{error || 'Película no encontrada'}</div>
			</div>
		);
	}

	return (
		<div className="container">
			<button
				onClick={() => navigate(-1)}
				className="btn"
				style={{ marginBottom: '20px' }}
			>
				← Volver
			</button>

			{/* Movie details with background image */}
			<div
				className="movie-details"
				style={{ backgroundImage: `url(${movie.image})` }}
			>
				<h1>{movie.name}</h1>

				<div className="movie-info">
					<div className="info-section">
						<h3>Sinopsis</h3>
						<p>{movie.info}</p>
					</div>

					<div className="info-section">
						<h3>Saga</h3>
						<p>{movie.saga}</p>
					</div>
				</div>

				<div className="movie-actions">
					<a
						href={movie.url}
						target="_blank"
						rel="noopener noreferrer"
						className="btn btn-primary"
						style={{ marginTop: '20px' }}
					>
						Ver Ahora
					</a>
				</div>
			</div>
		</div>
	);
}

export default Movie;