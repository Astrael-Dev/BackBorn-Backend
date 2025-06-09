import express from 'express'; // Import the Express framework
// Import your authentication middleware
import { authenticateToken } from '../middlewares/authMiddleware.js'; // Import the JWT authentication middleware

const router = express.Router(); // Create a new router instance

// Protected route: only accessible if the token is valid
router.get('/profile', authenticateToken, (req, res) => {
// Here, we can access req.user, which contains the decoded token data from the JWT
  res.json({ message: 'Profile data', user: req.user }); // Respond with profile data and user info
});

export default router; // Export the router for use in the main app