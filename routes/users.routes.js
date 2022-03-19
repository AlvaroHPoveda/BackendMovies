const express = require('express');

// Controllers
const {
  createNewUser,
  getAllUsers,
  getUsersById,
  updateUser,
  deleteUser
} = require('../controllers/users.controller');


const router = express.Router();

router.post('/', createNewUser);
router.get('/', getAllUsers);
router.get('/:id', getUsersById);
router.patch('/:id', updateUser);
router.delete('/:id', deleteUser);


module.exports = { usersRouter: router };
