// controllers/userController.js
const User = require('../models/user');

// Register User
exports.registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, phone } = req.body;

    const newUser = new User({ firstName, lastName, email, phone });
    await newUser.save();

    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get User by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update User
exports.updateUser = async (req, res) => {
  try {
    const { firstName, lastName, email, phone } = req.body;
    const user = await User.findByIdAndUpdate(req.params.id, { firstName, lastName, email, phone }, { new: true });

    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete/Disable User
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, { isActive: false }, { new: true });
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json({ message: 'User disabled', user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// List All Users with Filters
exports.listUsers = async (req, res) => {
  try {
    const { firstName, lastName, email, phone } = req.query;

    const query = {};
    if (firstName) query.firstName = firstName;
    if (lastName) query.lastName = lastName;
    if (email) query.email = email;
    if (phone) query.phone = phone;

    const users = await User.find(query);

    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
