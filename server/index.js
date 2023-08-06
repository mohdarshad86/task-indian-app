const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require("fs");
require('dotenv').config()
const ffmpeg = require("fluent-ffmpeg");
const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;
const extractAudio = require('ffmpeg-extract-audio')
const app = express();
const PORT = process.env.PORT || 5000;
const { Configuration, OpenAIApi } = require("openai");

console.log(process.env.OPENAI_API_KEY);

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// Enable CORS for all routes
app.use(cors());

ffmpeg.setFfmpegPath(ffmpegPath);

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
app.post('/upload', upload.single('video'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No video file provided' });
        }

        // Process the uploaded video (save to database, cloud storage, etc.)
        const videoPath = req.file.path;
        console.log('Video file saved at:', videoPath);

        const outputPath = 'output\\' +  'abc.mp3'
        await extractAudio({
            input: videoPath,
            output: outputPath,
        })
        console.log(outputPath);

        const captionData = await transcribeAudio(outputPath)
        // console.log(captionData);

        // Respond with a success message
        return res.json({ message: 'Video file uploaded successfully' });
    } catch (error) {
        console.log(error);
        return res.json({ message: 'Error in Upload' });
    }
});

// Transcribe audio
async function transcribeAudio(filename) {
    const transcript = await openai.createTranscription(
        fs.createReadStream(filename),
        "whisper-1"
    );
    console.log(transcript);
    return transcript.data.text;
}

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
