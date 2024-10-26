// controllers/profileController.js
const User = require('../models/User');
const Book = require('../models/Book');

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    res.json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['username', 'email', 'password'];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));

    if (!isValidOperation) {
      return res.status(400).json({ message: 'Invalid updates' });
    }

    const user = await User.findById(req.user.userId);
    updates.forEach(update => user[update] = req.body[update]);
    await user.save();

    res.json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteProfile = async (req, res) => {
  try {
    await Book.deleteMany({ owner: req.user.userId });
    await User.findByIdAndDelete(req.user.userId);
    res.json({ message: 'Profile deleted successfully' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
