import React, { useRef } from 'react'

const UploadVideo = ({ setSelectedFile, setFilePreview, setError }) => {

  const inputFileRef = useRef()

  const handleFileChange = (e) => {

    const file = e.target.files[0];
    setSelectedFile(file);
    setFilePreview(URL.createObjectURL(file));

    setError(null);

    if (file && !file.type.includes('video')) {
      setError('Please select a valid video file (e.g., .mp4, .mov, .avi).');
    }
  };

  return (
    <>
      <p style={{ color: '#ff5000' }}>STEP 1</p>
      <h2>Select Your Video</h2>
      <input ref={inputFileRef} style={{ display: 'none' }} type="file" accept="video/*" onChange={handleFileChange} />
      <div className='vid-select-box' onClick={() => {
        inputFileRef.current.click()
      }}>
        <img src='https://img.icons8.com/?size=512&id=103205&format=png' alt='upload' />
        <b><p>Click or Drag/Drop to upload your video</p></b>
        <p>MP4, MOV format accepted</p>
      </div>
    </>
  )
}

export default UploadVideo