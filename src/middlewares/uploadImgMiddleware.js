import multer from 'multer'; // Import multer for handling file uploads
import path from 'path'; // Import path for working with file and directory paths

// Configure storage settings for multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'src/uploads'); // Specify the directory to store uploaded files
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9); // Create a unique suffix for the filename
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname)); // Use the original file extension
    }
});

// Export the configured multer instance as 'upload' for use as middleware
export const upload = multer({ storage });