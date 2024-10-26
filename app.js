// app.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set up EJS for email templates
app.set('view engine', 'ejs');



// Routes (we'll add these later)
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/books', require('./routes/bookRoutes'));
app.use('/api/profile', require('./routes/profileRoutes'));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 3000;
// Database connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() =>{ console.log('Connected to MongoDB')
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  })})
  .catch(err => console.error('MongoDB connection error:', err));


module.exports = app;