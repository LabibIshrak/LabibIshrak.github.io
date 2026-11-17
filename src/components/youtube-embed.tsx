"use client";

import { useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";

/**
 * Click-to-load YouTube player. Nothing from YouTube loads until the
 * visitor presses play, which keeps the page fast and cookie-free.
 */
export function YouTubeEmbed({ id, title }: { id: string; title: string }) {
  const [playing, setPlaying] = useState(false);

  if (playing) {
    return (
      <iframe
        className="yt-frame"
        src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    );
  }

  return (
    <button
      type="button"
      className="yt-facade"
      onClick={() => setPlaying(true)}
      aria-label={`Play video: ${title}`}
      data-cursor="PLAY"
    >
      <Image
        src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
        alt=""
        fill
        sizes="(max-width: 760px) 92vw, 560px"
        unoptimized
      />
      <span className="yt-play" aria-hidden="true">
        <Play size={26} fill="currentColor" strokeWidth={0} />
      </span>
    </button>
  );
}
