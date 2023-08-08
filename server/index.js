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
const ffmpegStaticPath = require('ffmpeg-static');
const spawn = require('child_process').spawn;

const app = express();
const PORT = process.env.PORT || 5000;
const DG_API_KEY = process.env.DG_API_KEY || '61f4f3d67ac70e5d36ef20d4b862a6bae55d068e';
// const { Configuration, OpenAIApi } = require("openai");

// const configuration = new Configuration({
//     apiKey: process.env.OPENAI_API_KEY,
// });
// const openai = new OpenAIApi(configuration);

const deepgram = new Deepgram(DG_API_KEY);

app.use(cors());
app.use(express.static(path.join(__dirname, 'output/video')));

ffmpeg.setFfmpegPath(ffmpegPath);
app.set('ffmpegStaticPath', ffmpegStaticPath);

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
            return res.status(400).json({ status: false, message: 'No video file provided' });
        }
        const videoPath = req.file.path;
        const outputVideoPath = 'output/video/' + req.file.filename;
        const outputAudioPath = await exAudio(req.file, videoPath);
        const captionData = await transcribeAudio(outputAudioPath);
        // console.log(captionData);
        addVideoCaption(res, captionData, videoPath, outputVideoPath, req.file.filename);
    } catch (error) {
        console.log(error);
        return res.json({ status: false, message: 'Error in Upload' });
    }
});

async function exAudio(file, videoPath) {
    const outputPath = 'output/audio/' + file.filename + '.mp3'
    await extractAudio({
        input: videoPath,
        output: outputPath,
    })

    return outputPath;
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

//processVideoWithCaption()

async function addVideoCaption(res, captionData, videoPath, outputPath, fileName) {
    let captions = []
    captionData.forEach(t => {
        captions.push(`drawtext=text='${t.text}':
        x=(w-tw)/2:
        y=(h-lh)/2:
        fontsize=24:
        fontcolor=black:
        bordercolor=white:
        borderw=5:
        enable='between(t,${t.start},${t.end})'
        `)
    });

    // Process video using FFmpeg
    const ffmpegProcess = spawn(app.get('ffmpegStaticPath'), [
        '-i', videoPath,
        '-vf', captions.join(','),
        '-c:a', 'copy',
        outputPath
    ]);


    ffmpegProcess.on('error', (err) => {
        console.error('FFmpeg Error:', err);
        res.status(500).json({ status: false, message: 'An error occurred while processing the video.' });
    });

    ffmpegProcess.on('close', (code) => {
        if (code === 0) {
            return res.status(200).json({ status: true, message: 'Caption added successfully.', captionData, fileName });
        } else {
            return res.status(500).json({ status: false, message: 'Video processing failed.' });
        }
    });

    ffmpegProcess.stdin.end();
}

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
