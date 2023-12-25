const User = require('../models/user.model');

// CRUD methods for User model

// get all users
exports.getAllUsers = (req, res) => {
  User.findAll()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'Error retrieving users' });
    });
};

// get user by id
exports.getUserById = (req, res) => {
  const id = req.params.id;

  User.findByPk(id)
    .then(user => {
      if (!user) {
        res.status(404).json({ message: 'User not found' });
      } else {
        res.status(200).json(user);
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'Error retrieving user' });
    });
};

// Create and Save a new User
exports.createUser = (req, res) => {
  // Validate request
  if (!req.body.name || !req.body.email) {
    res.status(400).json({ message: 'Content can not be empty!' });
    return;
  }

  // Create a User
  const user = {
    name: req.body.name,
    email: req.body.email,
  };

  // Save User in the database
  User.create(user)
    .then(data => {
      res.status(201).json(data);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'Error creating user' });
    });
};

// Update a User by the id in the request
exports.updateUser = (req, res) => {
  const id = req.params.id;

  User.update(req.body, { where: { id: id } })
    .then(num => {
      if (num == 1) {
        res.status(200).json({ message: 'User updated successfully' });
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'Error updating user' });
    });
};

// Delete a User with the specified id in the request
exports.deleteUser = (req, res) => {
  const id = req.params.id;

  User.destroy({ where: { id: id } })
    .then(num => {
      if (num == 1) {
        res.status(200).json({ message: 'User deleted successfully' });
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'Error deleting user' });
    });
};