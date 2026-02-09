import { Router } from 'express'
import pelisRoutes from './api/peliculas.routes.js'

const router = Router()

router.get('/', (req, res) => { 
    res.send('bienvenidos') 
})
router.use(pelisRoutes)

export default router