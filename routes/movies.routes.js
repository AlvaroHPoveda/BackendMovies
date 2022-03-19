const express = require('express');

// Controllers
const {
  getAllMovies,
  createNewMovie,
  getMoviesById,
  updateMovie,
  deleteMovie
} = require('../controllers/movies.controller');


const router = express.Router();

router.post('/', createNewMovie);
router.get('/', getAllMovies);
router.get('/:id', getMoviesById);
router.patch('/:id', updateMovie);
router.delete('/:id', deleteMovie);


module.exports = { moviesRouter: router };
