import React from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

export default function SpeechLib() {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <section className="customContainer section flexCenter flex-col">
      {" "}
      <h1>Speech to Text using React Library</h1>
      <div className="flex flex-col gap-10 w-full">
        <p>Microphone: {listening ? "on" : "off"}</p>
        <button className="btn" onClick={SpeechRecognition.startListening}>
          Start
        </button>
        <button className="btn" onClick={SpeechRecognition.stopListening}>
          Stop
        </button>
        <button className="btn" onClick={resetTranscript}>
          Reset
        </button>
        <div className="border border-black min-h-[30vh]">
          <p>{transcript}</p>
        </div>
      </div>
    </section>
  );
}
