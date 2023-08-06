import React, { useState, useRef } from 'react';
import axios from 'axios';

const UploadVideo = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const inputFileRef = useRef()

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setFilePreview(URL.createObjectURL(file)); // Create a preview URL for the selected video

    // Clear previous error messages
    setError(null);

    // Check if the selected file is a video
    if (file && !file.type.includes('video')) {
      setError('Please select a valid video file (e.g., .mp4, .mov, .avi).');
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      setLoading(true)
      // Continue with file upload if no validation error
      if (!error) {
        const formData = new FormData();
        formData.append('video', selectedFile);

        axios
          .post('http://localhost:5000/upload', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
          .then((response) => {
            console.log(response.data);
            // Handle the response from the backend
          })
          .catch((error) => {
            console.error('Error uploading video:', error);
          }).finally(() => {
            setLoading(false)
          });
      }
    } else {
      setError('Please select a video file before uploading.');
    }
  };

  return (
    <div className='main-video'>

      {filePreview ? <>
        <p style={{ color: '#ff5000' }}>STEP 2</p>
        <h2>Upload Your Video</h2>
        <video className='video-preview' width="1080" height="1920" controls>
          <source src={filePreview} type={selectedFile.type} />
          Your browser does not support the video tag.
        </video>
        <button className='upload-btn' onClick={handleUpload}> {loading ? <img style={{ maxWidth: '24px' }} src='https://i.gifer.com/ZKZg.gif' alt='loading' /> : 'Upload Video'}</button>
      </>
        : <>
          <p style={{ color: '#ff5000' }}>STEP 1</p>
          <h2>Select Your Video</h2>
          <input ref={inputFileRef} style={{ display: 'none' }} type="file" accept="video/*" onChange={handleFileChange} />
          <div className='vid-select-box' onClick={() => {
            inputFileRef.current.click()
          }}>
            <b><p>Click or Drag/Drop to upload your video</p></b>
            <p>MP4, MOV format accepted</p>
            <img src='https://img.icons8.com/?size=512&id=103205&format=png' alt='upload' />
          </div>
          {error && <div style={{ color: 'red' }}>{error}</div>}
        </>
      }

    </div>
  );
};

export default UploadVideo;
