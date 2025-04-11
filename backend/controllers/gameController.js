// controllers/gameController.js
const pool = require('../database/db');

// Middleware to validate admin access (using a simple API key approach)
exports.isAdmin = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  
  // This is a simple validation - in a real app, use proper authentication
  if (apiKey === 'admin-secret-key') {
    next();
  } else {
    res.status(401).json({ message: 'Unauthorized: Admin access required' });
  }
};

// Get all games
exports.getAllGames = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT id, title, image_url, genre FROM games ORDER BY created_at DESC');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching games:', error);
    res.status(500).json({ message: 'Error fetching games' });
  }
};

// Get a specific game by ID
exports.getGameById = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM games WHERE id = ?', [req.params.id]);
    
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Game not found' });
    }
    
    res.json(rows[0]);
  } catch (error) {
    console.error('Error fetching game:', error);
    res.status(500).json({ message: 'Error fetching game details' });
  }
};

// Create a new game
exports.createGame = async (req, res) => {
  const {
    title,
    description,
    image_url,
    download_url,
    publisher,
    release_date,
    genre,
    os_requirements,
    processor_requirements,
    memory_requirements,
    graphics_requirements,
    storage_requirements
  } = req.body;

  try {
    const [result] = await pool.query(
      `INSERT INTO games (
        title, description, image_url, download_url, publisher, 
        release_date, genre, os_requirements, processor_requirements,
        memory_requirements, graphics_requirements, storage_requirements
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        title, description, image_url, download_url, publisher,
        release_date, genre, os_requirements, processor_requirements,
        memory_requirements, graphics_requirements, storage_requirements
      ]
    );
    
    res.status(201).json({
      message: 'Game created successfully',
      gameId: result.insertId
    });
  } catch (error) {
    console.error('Error creating game:', error);
    res.status(500).json({ message: 'Error creating game' });
  }
};

// Update a game
exports.updateGame = async (req, res) => {
  const { id } = req.params;
  const {
    title,
    description,
    image_url,
    download_url,
    publisher,
    release_date,
    genre,
    os_requirements,
    processor_requirements,
    memory_requirements,
    graphics_requirements,
    storage_requirements
  } = req.body;

  try {
    const [result] = await pool.query(
      `UPDATE games SET
        title = ?, description = ?, image_url = ?, download_url = ?, 
        publisher = ?, release_date = ?, genre = ?, os_requirements = ?,
        processor_requirements = ?, memory_requirements = ?,
        graphics_requirements = ?, storage_requirements = ?
       WHERE id = ?`,
      [
        title, description, image_url, download_url, publisher,
        release_date, genre, os_requirements, processor_requirements,
        memory_requirements, graphics_requirements, storage_requirements, id
      ]
    );
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Game not found' });
    }
    
    res.json({ message: 'Game updated successfully' });
  } catch (error) {
    console.error('Error updating game:', error);
    res.status(500).json({ message: 'Error updating game' });
  }
};

// Delete a game
exports.deleteGame = async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM games WHERE id = ?', [req.params.id]);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Game not found' });
    }
    
    res.json({ message: 'Game deleted successfully' });
  } catch (error) {
    console.error('Error deleting game:', error);
    res.status(500).json({ message: 'Error deleting game' });
  }
};