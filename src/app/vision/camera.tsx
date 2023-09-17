"use client";
import React, { useRef, useEffect, useState } from "react";
import Link from "next/link";

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
        <div>
          <div className="text-purple-300 py-4 px-8 flex border-b border-gray-600 items-center">
            <div className="mr-auto text-3xl"> <Link href="/dashboard"> Dashboard </Link></div>
            <div className="px-8 flex items-center gap-10">
              <button
                className="hover:cursor-point hover:underline"
                onClick={takePhoto}
              >
                Capture
              </button>
              <button onClick={closePhoto}>
                <svg
                  className="fill-purple-300 w-8 h-8"
                  clip-rule="evenodd"
                  fill-rule="evenodd"
                  stroke-linejoin="round"
                  stroke-miterlimit="2"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="m12.002 2.005c5.518 0 9.998 4.48 9.998 9.997 0 5.518-4.48 9.998-9.998 9.998-5.517 0-9.997-4.48-9.997-9.998 0-5.517 4.48-9.997 9.997-9.997zm0 8.933-2.721-2.722c-.146-.146-.339-.219-.531-.219-.404 0-.75.324-.75.749 0 .193.073.384.219.531l2.722 2.722-2.728 2.728c-.147.147-.22.34-.22.531 0 .427.35.75.751.75.192 0 .384-.073.53-.219l2.728-2.728 2.729 2.728c.146.146.338.219.53.219.401 0 .75-.323.75-.75 0-.191-.073-.384-.22-.531l-2.727-2.728 2.717-2.717c.146-.147.219-.338.219-.531 0-.425-.346-.75-.75-.75-.192 0-.385.073-.531.22z"
                    fill-rule="nonzero"
                  />
                </svg>
              </button>
              <button className="hover:cursor-point hover:underline">
                <Link href="/dashboard">Go back</Link>
              </button>
            </div>
          </div>
          <div className="flex items-center px-10 justify-evenly mt-10">
            <video ref={videoRef}></video>
            <div className={`result ${hasPhoto ? "hasPhoto" : ""}`}>
              <canvas ref={photoRef}></canvas>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
