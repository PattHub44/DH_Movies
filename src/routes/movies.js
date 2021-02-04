const express = require('express');
const router = express.Router();
const moviesController = require('../controllers/moviesControllers')

// Listado completo de peliculas y actores
router.get('/', moviesController.list);
router.get('/actors', moviesController.listActors);

// Detalles de una pelicula
router.get('/detail/:id', moviesController.detail)

//crear una pelicula
router.get('/create', moviesController.create)
router.post('/create', moviesController.store)

//nuevas y recomendadas
router.get('/new', moviesController.new)
router.get('/recommended', moviesController.recommended)

//borrar y editar
router.get('/edit/:id', moviesController.edit)
router.post('/edit/:id', moviesController.update)

router.post('/delete/:id', moviesController.delete)

//busqueda
router.post('/search', moviesController.search)

module.exports = router;
