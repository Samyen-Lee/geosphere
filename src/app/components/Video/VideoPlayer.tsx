import React, { FC, LegacyRef, useEffect, useRef } from "react";

const VideoPlayer: FC<
  React.DetailedHTMLProps<
    React.VideoHTMLAttributes<HTMLVideoElement>,
    HTMLVideoElement
  >
> = (props) => {
  const { src, autoPlay } = props;
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const videoEl = videoRef.current;
    const onMouseEnter = () => {
      videoEl?.paused && videoEl?.play();
    };
    const onMouseLeave = () => {
      videoEl?.played && videoEl?.pause();
    };
    if (videoEl) {
      if (autoPlay) {
        videoEl.addEventListener("mouseenter", onMouseEnter);
        videoEl.addEventListener("mouseleave", onMouseLeave);
      }
    }

    return () => {
      if (videoEl) {
        videoEl?.removeEventListener("mouseenter", onMouseEnter);
        videoEl?.removeEventListener("mouseleave", onMouseLeave);
      }
    };
  }, []);

  return (
    <video ref={videoRef} className="h-full w-full bg-black hover:cursor-pointer">
      <source src={src} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
};

export default VideoPlayer;
