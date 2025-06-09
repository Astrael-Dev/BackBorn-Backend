import fs from 'fs'; // Import fs for file system operations
import path from 'path'; // Import path for handling file paths
import sqlite3 from 'sqlite3'; // Import sqlite3 for database operations
import { fileURLToPath } from 'url'; // Import utility to convert import.meta.url to a file path

// Get the directory name of the current module file
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Build the path to the database file and the SQL initialization script
const dbPath = path.join(__dirname, 'database', 'users.db');
const initSqlPath = path.join(__dirname, 'database', 'init.sql');

// Step 1: Delete the existing database file if it exists
if (fs.existsSync(dbPath)) {
    fs.unlinkSync(dbPath); // Remove the old database file
    console.log('✅ Old users.db deleted.');
}

// Step 2: Recreate the users.db file and run the SQL initialization script
const db = new sqlite3.Database(dbPath); // Create a new database file

const initSql = fs.readFileSync(initSqlPath, 'utf8'); // Read the SQL commands from init.sql
db.exec(initSql, (err) => { // Execute the SQL commands to initialize the database schema
    if (err) {
        console.error('❌ Error executing init.sql:', err.message); // Log error if initialization fails
    } else {
        console.log('✅ Database initialized successfully.'); // Log success if initialization succeeds
    }
        db.close(); // Close the database connection
});