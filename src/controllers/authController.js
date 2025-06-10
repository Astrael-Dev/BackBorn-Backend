import bcrypt from 'bcrypt'; // Import bcrypt for password hashing
import jwt from 'jsonwebtoken'; // Import jsonwebtoken for JWT creation
import db from '../database/db.js'; // Import the database connection

// Controller for user signup (registration)
export const signup = async (req, res) => {
    const { username, email, password } = req.body; // Extract user data from the request body
    const hashedPassword = await bcrypt.hash(password, 10); // Hash the user's password with bcrypt
    const profilePicture = req.file ? `/uploads/${req.file.filename}` : null; // Set profile picture path if file uploaded

    // SQL query to insert the new user into the database
    const query = `INSERT INTO users (username, email, password, profile_picture) VALUES (?, ?, ?, ?)`;
    db.run(query, [username, email, hashedPassword, profilePicture], function (err) {
        if (err) {
            console.error('Error during signup:', err.message); // Log error if insertion fails
            return res.status(500).json({ error: 'Internal server error' }); // Respond with error
        }
        res.status(201).json({ message: 'User created successfully', userId: this.lastID }); // Respond with success and user ID
    });
};

// Controller for user login (authentication)
export const login = async (req, res) => {
    const { email, password } = req.body; // Extract email and password from the request body
    const query = `SELECT * FROM users WHERE email = ?`; // SQL query to find user by email

    db.get(query, [email], async (err, user) => {
        if (err) {
            console.error('Error during login:', err.message); // Log error if query fails
            return res.status(500).json({ error: 'Internal server error' }); // Respond with error
        }
        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' }); // Respond if user not found
        }

        const isPasswordValid = await bcrypt.compare(password, user.password); // Compare provided password with hashed password
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid email or password' }); // Respond if password is invalid
        }

        const token = generateToken(user); // Generate a JWT token for the authenticated user

        res.status(200).json({ 
            message: 'Login successful', 
            userId: user.id, 
            profile_picture: user.profile_picture, // Include the profile picture path
            token // Respond with success, user ID, profile picture, and token
        });
    });
};

// Helper function to generate a JWT token for a user
function generateToken(user) {
    return jwt.sign(
        { id: user.id, email: user.email }, // Payload: user ID and email
        process.env.JWT_SECRET, // Secret key from environment variables
        { expiresIn: process.env.JWT_EXPIRATION || '3d' } // Token expiration (default 3 days)
    );
};