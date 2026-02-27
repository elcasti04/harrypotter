import { Peliculas } from "../models/model.js";
import { Op } from "sequelize";

export const getPeliculas = async (req, res) => {
    const peliculas = await Peliculas.findAll()
    res.send(peliculas)
}

export const getHpPelis = async (req, res) => {
    try {
        const { saga } = req.params
        console.log("Buscando saga:", saga);

        // Normalizar el parámetro de búsqueda
        const sagaNormalized = saga.toLowerCase().replace("-", " ").replace("-", "");

        // Obtener todas las películas y filtrar en memoria
        const todasLasPeliculas = await Peliculas.findAll();

        const peliculasFiltradas = todasLasPeliculas.filter(peli => {
            const sagaDB = peli.saga.toLowerCase().replace("-", " ").replace("-", "");

            // Coincidencia exacta o parcial más precisa
            return sagaDB === sagaNormalized ||
                   sagaDB.includes(sagaNormalized) ||
                   sagaNormalized.includes(sagaDB);
        });

        console.log("Películas encontradas:", peliculasFiltradas.length);
        console.log("Películas:", peliculasFiltradas.map(p => ({ id: p.id, name: p.name, saga: p.saga })));

        res.send(peliculasFiltradas);
    } catch (error) {
        console.log({ message: `este es el Error::: ${error}`})
        res.status(500).send({ error: error.message });
    }
}

export const getOnePeli = async (req, res) => {
    const { id } = req.params
    try {
        const pelicula = await Peliculas.findByPk(id)
        if (pelicula) {
            res.send(pelicula)
        } else {
            res.status(404).send('Pelicula no encontrada')
        }
    } catch (error) {
        console.log(error)
    }
}

export const createPelicula = async (req, res) => {
    const { saga, name, info, url, image } = req.body
    try {
        if (saga, name, info ,url, image) {
            res.send(await Peliculas.create({ saga, name, info, url, image }), 'pelicula creada')
        } else {
            res.send('faltan datos')
        }
    } catch (error) {
        console.log(error)
    }
}
