// controllers/authController.js
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// User registration
exports.register = async (req, res) => {
  const { email, password, name } = req.body;

  // Check whether user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(409).json({ message: 'Email already in use' });
  }

  // Create new user
  const user = new User({ email, password, name });
  await user.save();

  // Generate JWT
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'secret', { expiresIn: '1h' });

  res.status(201).json({ token, user: { id: user._id, email: user.email, name: user.name } });
};

// User login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  // Find user
  const user = await User.findOne({ email });
  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  // Generate JWT
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'secret', { expiresIn: '1h' });

  res.json({ token, user: { id: user._id, email: user.email, name: user.name } });
};
