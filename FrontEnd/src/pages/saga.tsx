import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMoviesBySaga } from '../service/api';
import type { Movie } from '../types/movie';

function Saga() {
	const { name } = useParams();
	const navigate = useNavigate();
	const [movies, setMovies] = useState<Movie[]>([]);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		if (name) {
			setLoading(true);
			getMoviesBySaga(name)
				.then((data) => {
					setMovies(data);
					setLoading(false);
				})
				.catch((error) => {
					console.error('Error al cargar las películas:', error);
					setLoading(false);
				});
		}
	}, [name]);


	const sagaName =
		name === 'harry-potter'
			? 'Harry Potter'
			: name === 'crepusculo'
				? 'Crepúsculo'
				: name;

	return (
		<div className="container">
			<button
				onClick={() => navigate('/')}
				className="btn"
				style={{ marginBottom: '20px', marginTop: '20px' }}
			>
				← Volver
			</button>

			<div className="hero" style={{ marginBottom: '40px' }}>
				<h2>Películas de {sagaName}</h2>
				<p>Disfruta de todas las películas de esta saga</p>
			</div>

			{loading && (
				<div className="loading">
					<span>Cargando...</span>
				</div>
			)}

			{!loading && movies.length === 0 && (
				<div className="error">No se encontraron películas para esta saga.</div>
			)}

			<div className="movie-grid" style={{ paddingBottom: '40px' }}>
				{movies.map((movie) => (
					<div
						key={movie.id}
						className="movie-card"
						onClick={() => navigate(`/movie/${movie.id}`)}
					>
						<img src={movie.image} alt={movie.name} />
						<div className="content">
							<h4>{movie.name}</h4>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default Saga;
