import { useEffect, useState } from "react";
import ReactPlayer from "react-player";

export default function VideoPlayer({ video, isActive, onVideoPlay }) {
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  useEffect(() => {
    if (isActive) {
      setIsPlayingVideo(true);
    } else {
      setIsPlayingVideo(false);
    }
  }, [isActive]);

  return (
    <div>
      <ReactPlayer
        url={video}
        controls
        playing={isPlayingVideo}
        onPlay={onVideoPlay}
        style={{
          padding: "2.5rem",
          background: "white",
          borderRadius: "1rem",
          maxWidth: "50rem",
          width: "100%",
        }}
        muted={true}
      />
    </div>
  );
}
