const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const urlRoutes = require('./routes/url');
const userRoutes = require('./routes/user');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/url', urlRoutes); // Add this line
app.use('/api/user', userRoutes);

// Database connection
mongoose.connect('mongodb://localhost:27017/CutUrl', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
  app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
  });
}).catch(err => {
  console.error('Database connection error:', err);
});
