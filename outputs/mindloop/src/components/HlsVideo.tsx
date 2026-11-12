import { useEffect, useRef } from "react";

const HLS_URL = "https://stream.mux.com/8wrHPCX2dC3msyYU9ObwqNdm00u3ViXvOSHUMRYSEe5Q.m3u8";

export function HlsVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let hls: import("hls.js").default | undefined;
    let cancelled = false;

    void import("hls.js").then(({ default: Hls }) => {
      if (cancelled) return;
      if (Hls.isSupported()) {
        hls = new Hls({ enableWorker: true, lowLatencyMode: true });
        hls.loadSource(HLS_URL);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          if (!reducedMotion) void video.play().catch(() => undefined);
        });
      } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
        video.src = HLS_URL;
        if (!reducedMotion) void video.play().catch(() => undefined);
      }
    });

    return () => {
      cancelled = true;
      hls?.destroy();
    };
  }, []);

  return <video ref={videoRef} className="absolute inset-0 h-full w-full object-cover grayscale" muted loop playsInline aria-hidden="true" />;
}
