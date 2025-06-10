import sqlite3 from 'sqlite3'; // Import the sqlite3 library for SQLite database operations
import fs from 'fs';           // Import Node.js file system module for file operations
import path from 'path';       // Import Node.js path module for handling file paths
import { fileURLToPath } from 'url'; // Import utility to convert file URLs to file paths

// Get the directory name of the current module file (ESM equivalent of __dirname)
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Check if the 'uploads' directory exists, and create it if it doesn't
const uploadsDir = path.join(__dirname, '../uploads');
if (fs.existsSync(uploadsDir)) {
  console.error('Uploads folder already exists');
} else {
  fs.mkdirSync(uploadsDir, { recursive: true });
  console.log('Uploads folder initialized successfully.');
}

// Create or open the SQLite database file 'users.db' in the current directory
const db = new sqlite3.Database(path.join(__dirname, 'users.db'));

// Read the SQL initialization script from 'init.sql' in the current directory
const initSql = fs.readFileSync(path.join(__dirname, 'init.sql'), 'utf8');

// Execute the SQL script to initialize the database (e.g., create tables)
db.exec(initSql, (err) => {
  if (err) {
    console.error('Error initializing database:', err.message); // Log error if initialization fails
  } else {
    console.log('Database initialized successfully.'); // Log success message
  }
});

// Export the database instance for use in other modules
export default db;