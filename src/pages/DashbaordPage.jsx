import { useState } from "react";
import Audio1 from "../assets/audios/file_example_MP3_700KB.mp3";
import Audio2 from "../assets/audios/chris-with-you-my-love-200181.mp3";
import Audio4 from "../assets/audios/Free_Test_Data_1MB_MP3.mp3";
import AudioPlayer from "../components/AudioPlayer";
import testVideo1 from "../assets/videos/DEMO_VIDEO.mp4";
import VideoPlayer from "../components/VideoPlayer";
import { useSelector } from "react-redux";

const AUDIO_FILES = [Audio1, Audio2, Audio4];
const VIDEO_FILES = [
  "https://www.youtube.com/watch?v=OgS1ZWZItno&list=PLu71SKxNbfoBAaWGtn9GA2PTw0HO0tXzq",
  "https://vimeo.com/989082177",
  testVideo1,
];

export default function DashboardPage() {
  const currentUser = useSelector((state) => state.authUser.data);

  const [activeAudioId, setActiveAudioId] = useState(null);
  const [activeVideoId, setActiveVideoId] = useState(null);
  const handlePlay = (id) => {
    setActiveAudioId(id);
  };

  const handleVideo = (id) => {
    setActiveVideoId(id);
  };

  return (
    <>
      <h1>Welcome {currentUser?.username}</h1>

      {AUDIO_FILES &&
        AUDIO_FILES.length > 0 &&
        AUDIO_FILES.map((audio, index) => {
          return (
            <AudioPlayer
              key={index}
              src={audio}
              id={index}
              isActive={activeAudioId === index}
              onPlay={() => handlePlay(index)}
            />
          );
        })}

      <div className="space-y-5">
        {VIDEO_FILES &&
          VIDEO_FILES.length > 0 &&
          VIDEO_FILES.map((video, index) => {
            return (
              <VideoPlayer
                key={index}
                video={video}
                isActive={activeVideoId === index}
                onVideoPlay={() => handleVideo(index)}
              />
            );
          })}
      </div>
    </>
  );
}
