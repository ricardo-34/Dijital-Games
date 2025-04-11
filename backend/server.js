// server.js
const express = require('express');
const cors = require('cors');
const gameRoutes = require('./routes/games');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/games', gameRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});