import React, { useRef, useState } from "react";
import { Play } from "lucide-react";
import { VideoWork } from "../../content/proof";

/**
 * Video with a poster + play button. Nothing downloads until the visitor taps
 * play, then it plays with sound and native controls.
 */
export const VideoCard: React.FC<{ video: VideoWork; dark?: boolean; className?: string }> = ({
  video,
  dark = true,
  className = "",
}) => {
  const ref = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);

  const start = () => {
    setStarted(true);
    // wait a tick so the controls attribute is applied, then play with sound
    requestAnimationFrame(() => ref.current?.play().catch(() => {}));
  };

  return (
    <figure className={`flex flex-col ${className}`}>
      <div
        className={`relative overflow-hidden rounded-[22px] bg-black ${
          video.shape === "portrait" ? "aspect-[9/16]" : "aspect-video"
        }`}
      >
        <video
          ref={ref}
          src={video.src}
          poster={video.poster}
          preload="none"
          playsInline
          controls={started}
          className="absolute inset-0 w-full h-full object-cover"
        />
        {!started && (
          <button
            type="button"
            onClick={start}
            aria-label={`Play video: ${video.title}`}
            className="group absolute inset-0 flex items-center justify-center bg-black/10 hover:bg-black/25 transition-colors cursor-pointer"
          >
            <span className="w-[72px] h-[72px] rounded-full bg-white/85 backdrop-blur-md flex items-center justify-center shadow-[0_10px_30px_rgba(0,0,0,0.3)] transition-transform duration-300 group-hover:scale-110">
              <Play size={28} className="text-black ml-1" fill="currentColor" aria-hidden="true" />
            </span>
          </button>
        )}
      </div>
      <figcaption className="mt-4 px-1">
        <p className={`text-[12px] font-semibold uppercase tracking-[0.04em] ${dark ? "text-[#a1a1a6]" : "text-[#bf4800]"}`}>
          {video.tag}
        </p>
        <p className={`mt-1 text-[21px] font-semibold tracking-[-0.02em] leading-snug ${dark ? "text-[#f5f5f7]" : "text-[#1d1d1f]"}`}>
          {video.title}
        </p>
        <p className={`mt-1 text-[15px] leading-snug ${dark ? "text-[#a1a1a6]" : "text-[#6e6e73]"}`}>{video.line}</p>
      </figcaption>
    </figure>
  );
};

/** Layout used on SOZO and Portfolio: big landscape reel, then a portrait reel beside a landscape ad. */
export const VideoShowcase: React.FC<{ videos: VideoWork[]; dark?: boolean }> = ({ videos, dark = true }) => {
  const landscape = videos.filter((v) => v.shape === "landscape");
  const portrait = videos.filter((v) => v.shape === "portrait");
  const [first, ...restLandscape] = landscape;

  return (
    <div className="space-y-12">
      {first && <VideoCard video={first} dark={dark} />}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-6 items-start">
        {portrait.map((v) => (
          <VideoCard key={v.src} video={v} dark={dark} className="md:col-span-4 max-w-[380px] w-full mx-auto md:max-w-none" />
        ))}
        {restLandscape.length > 0 && (
          <div className="md:col-span-8 space-y-10">
            {restLandscape.map((v) => (
              <VideoCard key={v.src} video={v} dark={dark} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
