import React, { useState } from "react";
import { ReactMic } from "react-mic";
import { Button } from "@mui/material";
import { Mic, MicOff } from "@mui/icons-material";

const AudioRecorder2 = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);

  function startRecording() {
    setIsRecording(true);
  }

  function stopRecording() {
    setIsRecording(false);
    sendAudio();
  }

  function onData(recordedBlob) {
    setAudioBlob(recordedBlob);
  }

  async function sendAudio() {
    const formData = new FormData();
    formData.append("audio", audioBlob, "recording.wav");
    const response = await fetch("/api/upload-audio", {
      method: "POST",
      body: formData,
    });
    console.log(response);
  }

  return (
    <div>
      <ReactMic
        record={isRecording}
        onData={onData}
        mimeType="audio/wav"
        sampleRate={16000}
        bitRate={16}
      />
      <Button onClick={isRecording ? stopRecording : startRecording}>
        {isRecording ? <MicOff /> : <Mic />}
      </Button>
    </div>
  );
};

export default AudioRecorder2;
/*
This code defines a component called `AudioRecorder` that uses the `useState` hook to keep track of whether recording is currently in progress (`isRecording`) and the recorded audio blob (`audioBlob`). The component renders a `ReactMic` component from the `react-mic` library that records audio when the `record` prop is set to `true`. The `onData` prop is called with the recorded audio blob when recording is complete. The component also renders a `Button` component from the Material-UI library that toggles recording when clicked.

When recording is stopped, the `sendAudio` function is called to send the recorded audio file via REST API. This function creates a new `FormData` object and appends the recorded audio blob to it. It then sends an HTTP POST request to `/api/upload-audio` with the form data as the request body.

I hope this helps! Let me know if you have any other questions.

Source: Conversation with Bing, 5/2/2023
(1) REST Api in node to send audio file along with json data. https://stackoverflow.com/questions/17488814/rest-api-in-node-to-send-audio-file-along-with-json-data.
(2) rest - Posting a File and Associated Data to a RESTful WebService .... https://stackoverflow.com/questions/4083702/posting-a-file-and-associated-data-to-a-restful-webservice-preferably-as-json.
(3) java - spring-boot REST POST API to send a file - Stack Overflow. https://stackoverflow.com/questions/39549115/spring-boot-rest-post-api-to-send-a-file.
(4) Send Recorded Audio File to Web Server With PHP. https://stackoverflow.com/questions/16815989/send-recorded-audio-file-to-web-server-with-php.
(5) How to send wav audio file using javascript and webapi c#. https://stackoverflow.com/questions/43889539/how-to-send-wav-audio-file-using-javascript-and-webapi-c-sharp.
*/
