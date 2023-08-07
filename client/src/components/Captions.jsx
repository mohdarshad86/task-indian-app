import React, { useEffect, useRef, useState } from 'react'

const Captions = ({ video }) => {
    const videoPlayer = useRef(null)
    const [currentTime, setCurrentTime] = useState(0);
    const data = [
        { text: 'Oh boy.', start: 0.19896908, end: 0.67649484 },
        { text: 'Okay.', start: 0.8356701, end: 0.9948454 },
        { text: "So we're gonna start finding twelve now.", start: 1.1540207, end: 2.6661856 },
        { text: 'There you go queen Go inside.', start: 9.292926, end: 10.49133 },
        { text: 'Go inside.', start: 10.651117, end: 11.130479 },
        { text: 'Go inside.', start: 11.689734, end: 12.328883 },
        { text: 'K.', start: 23.672714, end: 23.8322 },
        { text: "We're gonna round time here.", start: 23.99168, end: 25.201067 },
        { text: 'Yeah I use queen ability.', start: 31.166344, end: 32.200325 },
        { text: 'Fifty one seconds.', start: 34.370003, end: 35.41 },
        { text: 'Oh my gosh.', start: 39.65, end: 40.45 },
        { text: 'King still alive.', start: 40.93, end: 41.705 },
        { text: 'Bro, we might actually three star twelve.', start: 43.573723, end: 45.323162 },
        { text: "Let's go.", start: 45.95932, end: 46.59548 },
        { text: "Let's go right there.", start: 46.99308, end: 48.10636 },
        { text: 'There it is.', start: 48.34492, end: 48.742523 },
        { text: 'I just lost my half headphones, boy.', start: 48.90156, end: 50.491962 },
        { text: 'Recall queen at town eleven took down a twelve.', start: 52.340004, end: 55.540005 }
    ]

    useEffect(() => {
        videoPlayer.current.addEventListener('timeupdate', () => {
            setCurrentTime(videoPlayer.current.currentTime);
        })
    }, [])

    return (
        <div className='caption-main'>
            <div className='caption'>
                {data.map((caption) => {
                    return (

                        <div className={(caption.start <= currentTime && currentTime <= caption.end) ? 'caption-container active' : 'caption-container'}>
                            <p className='time'>{caption.start.toFixed(2)} - {caption.end.toFixed(2)}</p>
                            <p className='text'>{caption.text}</p>
                        </div>
                    )
                })}
            </div>
            <div className='caption-video'>

                <video ref={videoPlayer} className='video-preview' width="1080" height="1920" controls>
                    <source src={video} type={video.type} />
                    Your browser does not support the video tag.
                </video>
            </div>
        </div>
    )
}

export default Captions