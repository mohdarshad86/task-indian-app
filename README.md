ASSIGNMENT

Here is the assignment, I have made a video https://drive.google.com/file/d/1lVCBCvRb-XFl9BK3nqiyp0RGNKJoQ6Bq/view?usp=sharing
----
 Upload Video, Separate the audio from video & Get Captions - api call to openai wisper, we will need word level time stamp 

https://openai.com/research/whisper 

Generate this value - divide the whole transcript into two words and generate this array

Add Text to Video - use FFmpeg to add text to the video

Allow video export - allow video download with caption


UI IS NOT PRIORITY, JUST HAVE A UPLOAD OPTION AND after it is done DOWNLOAD button without style is also good.


Sources:


Similar app Submagic.co to this project

Create Instagram like Subtitles with Word Level Timestamps using OpenAI's Whisper and Deepgram's API


[info] use ffmpeg.wasm v0.11.6


[

    {

        "start": 9.99999999999998,

        "text": "You will",

        "end": 489,

        "break": true

    },

    {

        "start": 490,

        "text": "just provide",

        "end": 1119,

        "break": false

    },

    {

        "start": 1120,

        "text": "this topic",

        "end": 1689,

        "break": true

    },
]