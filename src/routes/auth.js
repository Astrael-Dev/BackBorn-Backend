import express from 'express'; // Import the Express framework to handle HTTP routes
import { signup, login } from '../controllers/authController.js'; // Import the signup and login controller functions
import { upload } from '../middlewares/uploadImgMiddleware.js'; // Import the upload middleware for handling image file uploads

const router = express.Router(); // Create a new Express router instance

router.post('/signup', upload.single('profile_picture'), signup); // Define a POST route for user signup, using the upload middleware to handle profile picture uploads, and handled by the signup controller
router.post('/login', login);   // Define a POST route for user login, handled by the login controller

export default router; // Export the router to be used in the main application
