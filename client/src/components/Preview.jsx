import React, { useState } from 'react'
import axios from 'axios';

const Preview = ({selectedFile, setCaptionData, error, setError, filePreview}) => {
    const [loading, setLoading] = useState(false);
    const [percent, setPercent] = useState(0);

    const handlePercent = () => {
        setPercent(percent => percent + 5)
    }

    const handleUpload = async () => {
        if (selectedFile) {
            setLoading(true)
            setPercent(0)
            const intervalId = setInterval(handlePercent, 1000);
            if (!error) {
                const formData = new FormData();
                formData.append('video', selectedFile);

                axios.post('http://localhost:5000/upload', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                })
                    .then((response) => {
                        setCaptionData(response.data);
                    })
                    .catch((error) => {
                        console.error('Error uploading video:', error);
                    })
                    .finally(() => {
                        setLoading(false)
                        clearInterval(intervalId);
                        setPercent(100)
                    });

            }
        } else {
            setError('Please select a video file before uploading.');
        }
    };

    return (
        <>
            <p style={{ color: '#ff5000' }}>STEP 2</p>
            <h2>Upload Your Video</h2>
            <div className='video-prev-main'>
                <video className='video-preview' width="1080" height="1920" controls>
                    <source src={filePreview} type={selectedFile.type} />
                    Your browser does not support the video tag.
                </video>
                {loading &&
                    <div className='progress-container'>
                        <div className='progress-back'>
                            <div className='progress-line' style={{ width: Math.min(percent, 99) + '%' }}>
                                {Math.min(percent, 99) + '%'}
                            </div>
                        </div>
                        {percent < 20 ? <p>Uploading Your Video</p> :
                            <p>Generating Captions</p>}
                    </div>
                }
            </div>
            <button className='upload-btn' onClick={handleUpload}> {loading ? <img style={{ maxWidth: '24px' }} src='https://i.gifer.com/ZKZg.gif' alt='loading' /> : 'Upload Video'}</button>
        </>
    )
}

export default Preview