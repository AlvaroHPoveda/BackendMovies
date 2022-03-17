const express = require('express');

// Controllers
const {
  getAllMovies,
  createNewMovie,
  updateMovie,
  deleteMovie
} = require('../controllers/movies.controller');


const router = express.Router();

router.get('/', getAllMovies);
router.post('/', createNewMovie);
router.patch('/:id', updateMovie);
router.delete('/:id', deleteMovie);


module.exports = { moviesRouter: router };
