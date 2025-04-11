// routes/games.js
const express = require('express');
const gameController = require('../controllers/gameController');
const router = express.Router();

// Get all games
router.get('/', gameController.getAllGames);

// Get a specific game by ID
router.get('/:id', gameController.getGameById);

// Create a new game (with admin validation)
router.post('/', gameController.isAdmin, gameController.createGame);

// Update a game
router.put('/:id', gameController.isAdmin, gameController.updateGame);

// Delete a game
router.delete('/:id', gameController.isAdmin, gameController.deleteGame);

module.exports = router;