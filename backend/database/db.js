// database/db.js
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'dijital_games',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  charset: 'utf8mb4'
});

async function initDatabase() {
  try {
    const connection = await pool.getConnection();
    
    // Create games table if not exists
    await connection.query(`
      CREATE TABLE IF NOT EXISTS games (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        image_url VARCHAR(1024) NOT NULL,
        download_url VARCHAR(1024) NOT NULL,
        publisher VARCHAR(255) NOT NULL,
        release_date DATE NOT NULL,
        genre VARCHAR(255) NOT NULL,
        os_requirements TEXT NOT NULL,
        processor_requirements TEXT NOT NULL,
        memory_requirements TEXT NOT NULL,
        graphics_requirements TEXT NOT NULL,
        storage_requirements TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    connection.release();
    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Database initialization error:', error);
    process.exit(1);
  }
}

initDatabase();

module.exports = pool;