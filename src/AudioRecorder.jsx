import React, { useState } from "react";
import { IconButton } from "@mui/material";
import MicIcon from "@mui/icons-material/Mic";
import StopIcon from "@mui/icons-material/Stop";
import GraphicEqIcon from "@mui/icons-material/GraphicEq";
import { useReactMediaRecorder } from "react-media-recorder";

const AudioRecorder = () => {
  const [audioData, setAudioData] = useState(null);
  const { status, startRecording, stopRecording, mediaBlobUrl } =
    useReactMediaRecorder({ audio: true });

  const handleRecordClick = () => {
    if (status === "idle") {
      startRecording();
    } else {
      stopRecording();
    }
  };

  const handleUploadClick = async () => {
    const formData = new FormData();
    formData.append("audio", audioData);
    try {
      const response = await fetch("/api/upload-audio", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      console.log("Audio uploaded:", data);
    } catch (error) {
      console.error("Error uploading audio:", error);
    }
  };

  const handleAudioData = (data) => {
    setAudioData(data);
  };

  if (mediaBlobUrl) {
    return (
      <div>
        <audio src={mediaBlobUrl} controls autoPlay onEnded={handleAudioData} />
        {audioData && <button onClick={handleUploadClick}>Upload Audio</button>}
      </div>
    );
  }

  return (
    <div>
      <IconButton onClick={handleRecordClick}>
        {status === "recording" ? (
          <GraphicEqIcon />
        ) : status === "idle" ? (
          <MicIcon />
        ) : (
          <StopIcon />
        )}
      </IconButton>
    </div>
  );
};

export default AudioRecorder;
