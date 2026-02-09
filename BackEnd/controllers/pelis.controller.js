import { Peliculas } from "../models/model.js";

export const getPeliculas = async (req, res) => {
    const peliculas = await Peliculas.findAll()
    res.send(peliculas)
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
    const { name, info, url, image } = req.body
    try {
        if (name, info ,url, image) {
            res.send(await Peliculas.create({ name, info, url, image }), 'pelicula creda')
        } else {
            res.send('faltan datos')
        }
    } catch (error) {
        console.log(error)
    }
}