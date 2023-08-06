const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require("fs");
require('dotenv').config()
const ffmpeg = require("fluent-ffmpeg");
const { Deepgram } = require("@deepgram/sdk");
const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;
const extractAudio = require('ffmpeg-extract-audio')

const app = express();
const PORT = process.env.PORT || 5000;
// const { Configuration, OpenAIApi } = require("openai");

// const configuration = new Configuration({
//     apiKey: process.env.OPENAI_API_KEY,
// });
// const openai = new OpenAIApi(configuration);
const deepgram = new Deepgram(process.env.DG_API_KEY);

app.use(cors());

ffmpeg.setFfmpegPath(ffmpegPath);

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

const upload = multer({ storage });

app.post('/upload', upload.single('video'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No video file provided' });
        }

        const outputPath = await exAudio(req.file);
        const captionData = await transcribeAudio(outputPath)

        return res.json({ message: 'Video file uploaded successfully', captionData });
    } catch (error) {
        console.log(error);
        return res.json({ message: 'Error in Upload' });
    }
});

async function exAudio(file) {
    const videoPath = file.path;
    const outputPath = 'output\\' + file.filename + '.mp3'
    return await extractAudio({
        input: videoPath,
        output: outputPath,
    })
}

async function transcribeAudio(filename) {
    // const transcript = await openai.createTranscription(
    //     fs.createReadStream(filename),
    //     "whisper-1"
    // );
    // console.log(transcript);
    // return transcript.data.text;

    const response = await deepgram.transcription.preRecorded(
        {
            stream: fs.createReadStream(filename),
            mimetype: 'mp3',
        },
        { paragraphs: 'true' }
    );
    let sentences = []
    response.results.channels[0].alternatives[0].paragraphs.paragraphs.forEach(paragraph => {
        sentences.push(...paragraph.sentences)
    });

    return sentences
}

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
