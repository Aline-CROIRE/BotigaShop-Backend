const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

connectDB();

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes (we'll add these later)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});