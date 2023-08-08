const ffmpeg = require('fluent-ffmpeg');
const { basename, join } = require('path');
const fsPromises = require('fs').promises;
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffprobePath = require('@ffprobe-installer/ffprobe').path;
ffmpeg.setFfmpegPath(ffmpegPath);
ffmpeg.setFfprobePath(ffprobePath);

const FOLDERS = {
    INPUT: './uploads',
    CAPTIONS: './captions',
    OUTPUT: './output'
};

function onError(err) {
    console.error(`Error: ${err.message}`, '\n');
    process.exitCode = 1;
}

async function addCaptionToVideo(inputPath, captionPath) {
    return new Promise((resolve, reject) => {
        const inputName = basename(inputPath);
        ffmpeg(inputPath)
            .input(captionPath)
            // .complexFilter([
            //     '[0:v][1:v]overlay=10:10[outv]',
            //     '[outv]subtitles=' + captionPath
            // ])
            .on('error', reject)
            .on('start', () => {
                console.log(`Adding captions to ${inputName}`);
            })
            .on('end', () => {
                console.log(`${inputName} processed with captions!`);
                resolve();
            })
            .save(join(FOLDERS.OUTPUT, inputName));
    });
}

async function processVideoWithCaption() {
    try {
        const inputFiles = await fsPromises.readdir(FOLDERS.INPUT);

        if (inputFiles.length === 0) {
            throw new Error('Please add an input video to the input folder');
        }

        const inputPath = join(FOLDERS.INPUT, inputFiles[0]);
        const captionPath = join(FOLDERS.CAPTIONS, 'caption.srt'); // Set your caption file path here
        await addCaptionToVideo(inputPath, captionPath);
    } catch (e) {
        onError(e);
        console.log(e);
    }
}

module.exports = { processVideoWithCaption }
