import { Router } from 'express'
import { getPeliculas, getOnePeli, createPelicula, getHpPelis } from '../../controllers/pelis.controller.js'

const router = Router()

router.get('/Pelis', getPeliculas)
router.get('/pelis/:id', getOnePeli)
router.post('/pelis', createPelicula)

router.get('/pelis/saga/:saga', getHpPelis)
router.get('/pelis/:id', getOnePeli)

export default router 