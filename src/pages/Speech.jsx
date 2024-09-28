import React, { useState, useRef } from "react";
import { useSelector } from "react-redux";

export default function Speech() {
  const [text, setText] = useState("");
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);

  const currentUser = useSelector((state) => state.authUser.data);

  // Initialize Speech Recognition API
  const initializeRecognition = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Speech Recognition API not supported.");
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = true;
    recognition.continuous = true;
    recognition.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0].transcript)
        .join("");
      setText(transcript);
    };
    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
    };

    recognitionRef.current = recognition;
  };

  // Start/stop listening for speech
  const handleSpeechRecognition = () => {
    if (!recognitionRef.current) {
      initializeRecognition();
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  // Convert text to speech
  const handleTextToSpeech = () => {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <section className="customContainer section flexCenter">
      <div className="flex flex-col gap-5 ">
        <h1>{currentUser?.username} Speech to Text and Text to Speech</h1>
        <button className="btn" onClick={handleSpeechRecognition}>
          {isListening ? "Stop Listening" : "Start Listening"}
        </button>
        <button className="btn" onClick={handleTextToSpeech} disabled={!text}>
          Speak Text
        </button>
        <textarea
          className="border"
          rows="10"
          cols="50"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
    </section>
  );
}
