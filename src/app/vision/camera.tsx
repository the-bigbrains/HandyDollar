"use client";
import React, { useRef, useEffect, useState } from "react";

export default function Camera() {
  // Specify the type as HTMLVideoElement for videoRef
  const videoRef = useRef<HTMLVideoElement | null>(null);
  // Specify the type as HTMLCanvasElement for photoRef
  const photoRef = useRef<HTMLCanvasElement | null>(null);
  const [hasPhoto, setHasPhoto] = useState(false);

  // Get the video stream from the webcam
  const getVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then((stream) => {
        let video = videoRef.current;
        if (!video) return; // Check if the video element is supported by the browser

        video.srcObject = stream;
        video.play();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const takePhoto = () => {
    // Take a photo
    const width = 414;
    const height = width / (16 / 9);

    let video = videoRef.current;
    let photo = photoRef.current;

    if (!video || !photo) return; // Check if the video and photo elements are supported by the browser

    photo.width = width;
    photo.height = height;

    let ctx = photo.getContext("2d"); // Get the canvas context
    if (!ctx) return; // Check if the canvas context is supported by the browser
    ctx.drawImage(video, 0, 0, width, height);
    setHasPhoto(true);
  };

  const closePhoto = () => {
    // Close the photo
    let photo = photoRef.current;
    if (!photo) return; // Check if the photo element is supported by the browser
    let ctx = photo.getContext("2d");
    if (!ctx) return; // Check if the canvas context is supported by the browser
    ctx.clearRect(0, 0, photo.width, photo.height);
    setHasPhoto(false);
  };

  useEffect(() => {
    // Get the video stream from the webcam
    getVideo();
  }, [videoRef]);

  return (
    // Display the video and photo elements
    <div className="App">
      <div className="Camera">
        <video ref={videoRef}></video>
        <button onClick={takePhoto}>Capture</button>
      </div>
      <div className={`result ${hasPhoto ? "hasPhoto" : ""}`}>
        <canvas ref={photoRef}></canvas>
        <button onClick={closePhoto}>X</button>
      </div>
    </div>
  );
}
