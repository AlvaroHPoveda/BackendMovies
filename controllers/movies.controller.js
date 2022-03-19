// Models
const { Movies } = require('../models/movies.model');

// Utils
const { catchAsync } = require('../util/catchAsync');
const { AppError } = require('../util/appError');

exports.createNewMovie = catchAsync(
  async (req, res, next) => {
    const { title, description, duration, rating, genre } =
      req.body;

    if (
      !title ||
      !description ||
      !duration ||
      !rating ||
      !genre
    ) {
      return next(
        new AppError(
          400,
          'Must provide a valid title, description, duration, rating, genre'
        )
      );
    }

    const newMovies = await Movies.create({
      title,
      description,
      duration,
      rating,
      genre
    });

    res.status(201).json({
      status: 'success',
      data: { newMovies }
    });
  }
);
exports.getAllMovies = catchAsync(
  async (req, res, next) => {
    const movies = await Movies.findAll({
      where: { status: 'active' }
    });
    res.status(200).json({
      status: 'sucess',
      data: { movies }
    });
  }
);
exports.getMoviesById = catchAsync(
  async (req, res, next) => {
    const { id } = req.params;

    const movies = await Movies.findOne({ where: { id } });

    if (!movies) {
      return next(new AppError(404, 'Movie not found'));
    }

    res.status(200).json({
      status: 'success',
      data: { movies }
    });
  }
);
exports.updateMovie = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const { title, description, duration, genre } = req.body;
  const data = {
    title,
    description,
    duration,
    genre
  };
  const movies = await Movies.findOne({
    where: { id: id, status: 'active' }
  });

  if (!movies) {
    return next(
      new AppError(404, 'Cant update movie, invalid ID')
    );
  }

  await movies.update({ ...data });

  res.status(204).json({ status: 'success' });
});
exports.deleteMovie = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const movies = await Movies.findOne({
    where: { id: id, status: 'active' }
  });

  if (!movies) {
    return next(
      new AppError(404, 'Cant delete movies, invalid ID')
    );
  }
  await movies.update({ status: 'deleted' });

  res.status(204).json({ status: 'success' });
});
