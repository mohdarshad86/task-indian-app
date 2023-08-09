import React, { useEffect, useRef, useState } from 'react'

const Captions = ({ video, captionData, downloadPath }) => {
    const videoPlayer = useRef(null)
    const [currentTime, setCurrentTime] = useState(0);

    useEffect(() => {
        videoPlayer.current.addEventListener('timeupdate', () => {
            setCurrentTime(videoPlayer.current.currentTime);
        })
    }, [])
    return (

        <div style={{ textAlign: 'center' }}>
            <p style={{ color: '#ff5000' }}>STEP 3</p>
            <h2>Download Your Video</h2>
            <a style={{ width: 'max-content', textDecoration: "none" }} className='upload-btn' href={'https://indian-app-guy-backend.onrender.com/' + downloadPath} download>Download</a>
            <div className='caption-main'>
                <div className='caption'>
                    {captionData.map((caption, i) => {
                        return (

                            <div className={(caption.start <= currentTime && currentTime <= caption.end) ? 'caption-container active' : 'caption-container'} key={i}>
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
                    <div className='caption-overlay'>
                        {captionData.map((caption, i) => {
                            return (
                                caption.start <= currentTime && currentTime <= caption.end &&
                                <div className='caption-overlay-text' key={i}>
                                    <p className='text'>{caption.text}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Captions