import sqlite3 from "sqlite3"; // Import SQLite3 for database operations
import bcrypt from "bcrypt"; // Import bcrypt for password hashing
import path from "path"; // Import path for handling file paths
import { fileURLToPath } from "url"; // Import utility to convert import.meta.url to a file path

// Get the directory name of the current module file
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Build the path to the database file located in the 'database' folder
const dbPath = path.join(__dirname, "database", "users.db");

// Open a connection to the SQLite database
const db = new sqlite3.Database(dbPath);

// Example users to seed into the database
const users = [
  { email: "alice@example.com", password: "password123" },
  { email: "bob@example.com", password: "bobsecure" },
  { email: "charlie@example.com", password: "charliepw" },
];

// Function to insert users into the database with hashed passwords
const seedUsers = async () => {
  for (const user of users) {
    // Hash the user's password before storing
    const hashed = await bcrypt.hash(user.password, 10);
    db.run(
      `INSERT INTO users (email, password) VALUES (?, ?)`, // SQL insert statement
      [user.email, hashed], // Use parameterized query to prevent SQL injection
      (err) => {
        if (err) 
          console.error(`❌ Failed to insert ${user.email}:`, err.message); // Log error if insertion fails
        else 
          console.log(`✅ Inserted ${user.email}`); // Log success if insertion succeeds
      }
    );
  }
};

// Run the seeding function and close the database when done
seedUsers().then(() => {
  console.log("🌱 Seeding done!");
  db.close();
});