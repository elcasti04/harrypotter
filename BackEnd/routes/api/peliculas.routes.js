import { Router } from 'express'
import { getPeliculas, getOnePeli, createPelicula } from '../../controllers/pelis.controller.js'

const router = Router()

router.get('/Pelis', getPeliculas)
router.get('/pelis/:id', getOnePeli)
router.post('/pelis', createPelicula)

export default router 