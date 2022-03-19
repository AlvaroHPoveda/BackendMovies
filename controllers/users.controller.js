const bcrypt = require('bcryptjs');

// Models
const { Users } = require('../models/users.model');

// Utils
const { catchAsync } = require('../util/catchAsync');
const { AppError } = require('../util/appError');
const { password } = require('pg/lib/defaults');

exports.createNewUser = catchAsync(
  async (req, res, next) => {
    const { username, email, password, role } = req.body;

    if (!username || !email || !password || !role) {
      return next(
        new AppError(
          400,
          'Must provide a valid username, email, password, role'
        )
      );
    }

    const salt = await bcrypt.getSalt(12)

    const hashedPassword = await bcrypt.hash(password, salt);

    const newUsers = await Users.create({
      username,
      email,
      password : hashedPassword,
      role
    });

    res.status(201).json({
      status: 'success',
      data: { newUsers }
    });
  }
);
exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await Users.findAll({
    where: { status: 'active' }
  });
  res.status(200).json({
    status: 'sucess',
    data: { users }
  });
});
exports.getUsersById = catchAsync(
  async (req, res, next) => {
    const { id } = req.params;

    const users = await Users.findOne({ where: { id } });

    if (!users) {
      return next(new AppError(404, 'User not found'));
    }

    res.status(200).json({
      status: 'success',
      data: { users }
    });
  }
);
exports.updateUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const { username, email } = req.body;
  const data = {
    username,
    email
  };
  const users = await Users.findOne({
    where: { id: id, status: 'active' }
  });

  if (!users) {
    return next(
      new AppError(404, 'Cant update user, invalid ID')
    );
  }

  await users.update({ ...data });

  res.status(204).json({ status: 'success' });
});
exports.deleteUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const users = await Users.findOne({
    where: { id: id, status: 'active' }
  });

  if (!users) {
    return next(
      new AppError(404, 'Cant delete user, invalid ID')
    );
  }
  await users.update({ status: 'deleted' });

  res.status(204).json({ status: 'success' });
});
