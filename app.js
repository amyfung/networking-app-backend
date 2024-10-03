// app.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const dotenv = require('dotenv');
const contactRoutes = require('./routes/contactRoutes');
const errorHandler = require('./middleware/errorHandler');
const logger = require('./utils/logger');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const rateLimit = require('express-rate-limit');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('combined', { stream: logger.stream }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/contacts', contactRoutes);

// Error handling middleware
app.use(errorHandler);

// Database connection
connectDB();

// Apply rate limiting to all requests
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  });

app.use(limiter);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});

