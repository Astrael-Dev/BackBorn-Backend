import express from 'express'; // Import Express framework
import cors from 'cors'; // Import CORS middleware for handling cross-origin requests
import authRoutes from './routes/auth.js'; // Import authentication routes
import userRoutes from './routes/user.js'; // Import user-related routes
import dotenvFlow from 'dotenv-flow'; // Import dotenv-flow for environment variable management
dotenvFlow.config(); // Load environment variables from .env files

const app = express(); // Create an Express application instance
app.use(cors()); // Use CORS middleware to allow cross-origin requests
const PORT = process.env.PORT || 10000; // Set the server port from environment or default to 3000

app.use(express.json()); // Middleware to parse incoming JSON requests


app.use("/api", authRoutes); // Mount authentication routes at /api
app.use("/api/users", userRoutes); // Mount user routes at /api/users

app.use("/src/uploads", express.static("src/uploads")); // Serve static files (like images) from the src/uploads directory

// Middleware to handle 404 errors for unknown routes
app.use((req, res, next) => {
  res.status(404).json({ error: 'Not found' });
});

// Start the server and listen on the specified port
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});