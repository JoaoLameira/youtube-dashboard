"use client";

import { useAtom, useSetAtom } from "jotai";
import React, { useEffect, useRef } from "react";
import { isPlayerReadyAtom, isPlayingAtom, playerRefAtom } from "~/store";
import { VideoPlayerProps } from "~/components/VideoPlayer/types";

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  videoId,
  trimStart,
  trimEnd,
}) => {
  const iframeContainerRef = useRef<HTMLDivElement>(null);
  const [playerRefAtomValue, setPlayerRefAtom] = useAtom(playerRefAtom);
  const setIsPlayingAtom = useSetAtom(isPlayingAtom);
  const [isPlayerReadyAtomValue, setIsPlayerReadyAtom] =
    useAtom(isPlayerReadyAtom);

  const handlePlayerStateChange = (event: YT.OnStateChangeEvent) => {
    if (event.data === YT.PlayerState.PLAYING) {
      setIsPlayingAtom(true);
    } else if (
      event.data === YT.PlayerState.PAUSED ||
      event.data === YT.PlayerState.ENDED
    ) {
      setIsPlayingAtom(false);
    }
  };

  const initializePlayer = () => {
    if (!iframeContainerRef.current || typeof YT === "undefined" || !YT.Player)
      return;

    const playerRef = new YT.Player(iframeContainerRef.current, {
      videoId,
      playerVars: {
        enablejsapi: 1,
        origin: window.location.origin,
        modestbranding: 1,
        rel: 0,
        showinfo: 0,
        controls: 1,
        fs: 0,
        end: trimEnd,
        start: trimStart,
      },
      events: {
        onReady: () => {
          setIsPlayerReadyAtom(true);
          setPlayerRefAtom(playerRef);
        },
        onStateChange: handlePlayerStateChange,
      },
    });
  };

  const destroyPlayer = () => {
    if (playerRefAtomValue?.destroy) {
      playerRefAtomValue.destroy();
    }
    setPlayerRefAtom(null);
    setIsPlayerReadyAtom(false);
  };

  useEffect(() => {
    window.onYouTubeIframeAPIReady = initializePlayer;

    if (typeof YT !== "undefined" && YT.Player) {
      initializePlayer();
    }

    return () => {
      destroyPlayer();
    };
  }, []);

  useEffect(() => {
    if (
      trimStart &&
      trimEnd &&
      playerRefAtomValue &&
      isPlayerReadyAtomValue &&
      typeof playerRefAtomValue.cueVideoById === "function"
    ) {
      playerRefAtomValue.cueVideoById({
        videoId,
        startSeconds: trimStart,
        endSeconds: trimEnd,
      });
    }
  }, [trimStart, trimEnd, playerRefAtomValue, isPlayerReadyAtomValue, videoId]);

  const getDuration = () => {
    if (
      playerRefAtomValue &&
      typeof playerRefAtomValue.getDuration === "function"
    ) {
      return playerRefAtomValue.getDuration();
    }
    console.warn("Player is not ready or does not have the method getDuration");
    return null;
  };

  useEffect(() => {
    if (isPlayerReadyAtomValue) {
      const duration = getDuration();
      if (duration) {
        console.log(`Video duration: ${duration} seconds`);
      }
    }
  }, [isPlayerReadyAtomValue]);

  return (
    <div className="relative w-full max-w-[800px] aspect-video">
      <div
        ref={iframeContainerRef}
        className="absolute top-0 left-0 w-full h-full"
      ></div>
    </div>
  );
};

export default VideoPlayer;
