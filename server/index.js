const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for all routes
app.use(cors());

// Set up multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const extension = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqueSuffix + extension);
    },
});

// Initialize multer with the storage settings
const upload = multer({ storage });

// Upload video route
app.post('/upload', upload.single('video'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No video file provided' });
        }

        // Process the uploaded video (save to database, cloud storage, etc.)
        const videoPath = req.file.path;
        console.log('Video file saved at:', videoPath);


        // Respond with a success message
        return res.json({ message: 'Video file uploaded successfully' });
    } catch (error) {
        console.log(error);
        return res.json({ message: 'Error in Upload' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
