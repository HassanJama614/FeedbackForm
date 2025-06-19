// server/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 5001;

// --- Middleware ---
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Allow the server to accept JSON in the request body

// --- MongoDB Connection ---
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Successfully connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// --- API Routes ---
app.use('/api/feedbacks', require('./routes/feedbacks'));

// --- Start the Server ---
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});