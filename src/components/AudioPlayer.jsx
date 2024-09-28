import { useEffect, useRef, useState } from "react";
import { FaPause, FaPlay } from "react-icons/fa";

export default function AudioPlayer({ src, onPlay, id, isActive }) {
  const audioRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  // Update current time, progress, and duration when the audio plays

  useEffect(() => {
    const handleTimeUpdate = () => {
      if (audioRef.current) {
        const currentTime = audioRef.current.currentTime;
        const duration = audioRef.current.duration;
        setCurrentTime(currentTime);
        setProgress((currentTime / duration) * 100);
        setDuration(duration);
      }
    };
    const audioElement = audioRef.current;
    if (audioElement) {
      audioElement.addEventListener("timeupdate", handleTimeUpdate);
    }
    return () => {
      if (audioElement) {
        audioElement.removeEventListener("timeupdate", handleTimeUpdate);
      }
    };
  }, [isPlaying]);

  // Handle visibility change to pause and resume the audio
  // useEffect(() => {
  //   const handleVisibilityChange = () => {
  //     if (document.hidden) {
  //       audioRef.current?.pause();
  //       setIsPlaying(false);
  //     } else if (isActive) {
  //       audioRef.current?.play();
  //       setIsPlaying(true);
  //     }
  //   };

  //   document.addEventListener("visibilitychange", handleVisibilityChange);
  //   return () => {
  //     document.removeEventListener("visibilitychange", handleVisibilityChange);
  //   };
  // }, [isActive]);

  // Play or pause the audio based on the isActive prop

  useEffect(() => {
    if (isActive) {
      audioRef.current?.play();
      setIsPlaying(true);
    } else {
      audioRef.current?.pause();
      setIsPlaying(false);
    }
  }, [isActive]);

  // Toggle play/pause and call onPlay callback

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
      onPlay();
    }
  };

  // Update audio currentTime based on progress bar click

  const handleProgressClick = (event) => {
    const progressBar = event.target;
    const offsetX = event.nativeEvent.offsetX;
    const totalWidth = progressBar.offsetWidth;
    const clickPosition = (offsetX / totalWidth) * 100;
    const newTime = (clickPosition / 100) * duration;

    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      setProgress(clickPosition);
      setCurrentTime(newTime);
    }
  };

  // Format time in minutes:seconds

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  };
  return (
    <div className="w-[350px] h-[65px] bg-white flex items-center justify-center px-4 rounded-xl  mb-5">
      <div className="w-full h-full flexCenter gap-5">
        <audio src={src} ref={audioRef} id={`${id} _audio`}></audio>
        <button onClick={togglePlayPause}>
          {isPlaying ? (
            <FaPause className="text-black" size={12} />
          ) : (
            <FaPlay className="text-black" size={12} />
          )}
        </button>
        <div
          onClick={handleProgressClick}
          className="w-full bg-gray-200 h-3 relative  cursor-pointer space-y-2"
        >
          <div
            className="bg-blue-500 h-full rounded-lg"
            style={{ width: `${progress}%` }}
          />
          <div className="text-gray-600">
            {formatTime(currentTime)} / {formatTime(duration)}
          </div>
        </div>
      </div>
    </div>
  );
}
