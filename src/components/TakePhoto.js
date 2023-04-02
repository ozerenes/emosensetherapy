import React, { useState, useRef, useEffect } from 'react';

export default () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [error, setError] = useState(null);

  // Request permission to access the camera
  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch(error => setError(error));
  }, []);

  // Take a photo every 10 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      takePhoto();
    }, 10000);
    return () => clearInterval(intervalId);
  }, []);

  function takePhoto() {
    if (!videoRef.current || !canvasRef.current) {
      return;
    }

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    // Set the canvas dimensions to match the video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw the video frame on the canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Convert the canvas image to a byte array in PNG format
    canvas.toBlob(blob => {
      const reader = new FileReader();
      reader.readAsArrayBuffer(blob);
      reader.onloadend = () => {
        const byteData = new Uint8Array(reader.result);
        sendToBackend(byteData);
      };
    }, 'image/png');
  }

  function sendToBackend(byteData) {
    // Convert the byte array to a Blob object
    const blob = new Blob([byteData], { type: 'image/png' });

    // Create a FormData object and append the image data with the key 'image'
    const formData = new FormData();
    formData.append('image', blob, 'image.png');

    // Send the form data to the backend endpoint
    const url = 'http://127.0.0.1:5000/process_image';
    const options = {
      method: 'POST',
      body: formData
    };

    fetch(url, options)
      .then(response => console.log('Response:', response))
      .catch(error => console.error('Error sending form data:', error));
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <video ref={videoRef} autoPlay muted />
      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </div>
  );
}
