import React, { useState } from 'react';
import Captions from './Captions';
import Preview from './Preview';
import UploadVideo from './UploadVideo';

const Home = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [filePreview, setFilePreview] = useState(null);
    const [error, setError] = useState(null);
    const [captionData, setCaptionData] = useState(null);

    return (
        <>
            {(captionData == null) &&
                <div className='main-video'>
                    {filePreview ? <Preview
                        selectedFile={selectedFile}
                        setCaptionData={setCaptionData}
                        error={error}
                        setError={setError}
                        filePreview={filePreview} />
                        : <UploadVideo
                            setSelectedFile={setSelectedFile}
                            setFilePreview={setFilePreview}
                            setError={setError} />
                    }
                </div>}
            {(captionData != null && captionData.captionData != null) && <Captions video={filePreview} captionData={captionData.captionData} downloadPath={captionData.fileName} />}
            {error && <div style={{ color: 'red' }}>{error}</div>}
        </>
    );
};

export default Home;
