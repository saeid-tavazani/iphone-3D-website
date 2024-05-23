import { ReactEventHandler, useEffect, useRef, useState } from "react";
import { hightlightsSlides } from "../constants";
import gsap from "gsap";
import { pauseImg, playImg, replayImg } from "../utils";
import { useGSAP } from "@gsap/react";
// import gsap from "gsap";

type videoType = {
  isEnd: boolean;
  startPlay: boolean;
  videoId: number;
  isLastVideo: boolean;
  isPlaying: boolean;
};

// React.MutableRefObject<HTMLVideoElement[]>

const VideoCarousel = () => {
  const videoRef = useRef<HTMLVideoElement[] | null>([]);
  const videoSpanRef = useRef<HTMLSpanElement[]>([]);
  const videoDivRef = useRef<HTMLSpanElement[]>([]);

  const [loadedData, setLoadedData] = useState<any[]>([]);
  const [video, setVideo] = useState<videoType>({
    isEnd: false,
    startPlay: false,
    videoId: 0,
    isLastVideo: false,
    isPlaying: false,
  });

  const { isEnd, startPlay, videoId, isLastVideo, isPlaying } = video;

  useGSAP(() => {
    gsap.to("#video", {
      scrollTrigger: {
        trigger: "#video",
        toggleActions: "restart none none none",
      },
      onComplete: () => {
        setVideo((pre) => ({ ...pre, startPlay: true, isPlaying: true }));
      },
    });
  }, [isEnd, videoId]);

  useEffect(() => {
    if (loadedData.length > 3) {
      if (!isPlaying && videoRef.current) {
        videoRef.current[videoId].pause();
      } else if (startPlay && videoRef.current) {
        startPlay && videoRef.current[videoId].play();
      }
    }
  }, [startPlay, videoId, isPlaying]);

  useEffect(() => {
    const currentProgress = 0;
    let span = videoSpanRef.current;

    if (span[videoId]) {
      let anim = gsap.to(span[videoId], {
        onUpdate: () => {},
        onComplete: () => {},
      });
    }
  }, [videoId, startPlay]);
  const handelLoadedMetadata = (
    i: number,
    e: React.SyntheticEvent<HTMLVideoElement, Event>
  ) => setLoadedData((pre) => [...pre, e]);

  const handleProcess = (
    type: "play" | "reset" | "end" | "last",
    i: number
  ) => {
    switch (type) {
      case "end":
        setVideo((pre) => ({
          ...pre,
          isEnd: true,
          videoId: i + 1,
        }));
        break;
      case "last":
        setVideo((pre) => ({
          ...pre,
          isLastVideo: true,
        }));
        break;
      case "reset":
        setVideo((pre) => ({
          ...pre,
          isLastVideo: false,
          videoId: 0,
        }));
        break;
      case "play":
        setVideo((pre) => ({
          ...pre,
          isPlaying: !pre.isPlaying,
        }));
        break;
      default:
        return video;
    }
  };

  return (
    <>
      <div className="flex items-center">
        {hightlightsSlides.map((list, i) => (
          <div key={list.id} id="slider" className="sm:pr-20 pr-10">
            <div className="video-carousel_container">
              <div className="w-full h-full flex-center rounded-3xl overflow-hidden bg-black">
                <video
                  id="video"
                  playsInline={true}
                  preload="auto"
                  muted
                  ref={(el) =>
                    el && videoRef.current ? (videoRef.current[i] = el) : null
                  }
                  onPlay={() => {
                    setVideo((prevVideo) => ({
                      ...prevVideo,
                      isPlaying: true,
                    }));
                  }}
                  onLoadedMetadata={(e) => handelLoadedMetadata(i, e)}
                >
                  <source src={list.video} type="video/mp4" />
                </video>
              </div>
              <div className="absolute top-12 left-[5%] z-10">
                {list.textLists.map((text) => (
                  <p className="md:text-2xl text-xl font-medium" key={text}>
                    {text}
                  </p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="relative flex-center mt-10">
        <div className="flex-center py-5 px-7 bg-gray-300 backdrop-blur rounded-full gap-2">
          {videoRef.current?.map((_, i) => (
            <span
              className="w-3 h-3 bg-gray-200 rounded-full relative cursor-pointer"
              key={i}
              ref={(el) => (el ? (videoDivRef.current[i] = el) : null)}
            >
              <span
                className="absolute w-full h-full rounded-full"
                ref={(el) => (el ? (videoSpanRef.current[i] = el) : null)}
              />
            </span>
          ))}
        </div>
        <button className="control-btn">
          <img
            src={isLastVideo ? replayImg : !isPlaying ? playImg : pauseImg}
            alt={isLastVideo ? "replay" : !isPlaying ? "play" : "pause"}
            onClick={
              isLastVideo
                ? () => handleProcess("reset", videoId)
                : !isPlaying
                ? () => handleProcess("play", videoId)
                : () => handleProcess("last", videoId)
            }
          />
        </button>
      </div>
    </>
  );
};

export default VideoCarousel;
