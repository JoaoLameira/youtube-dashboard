/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import React, { useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import {
  isPlayerReadyAtom,
  isPlayingAtom,
  playerRefAtom,
  trimEndAtom,
  trimStartAtom,
} from "~/store";
import SkeletonVideoPlayer from "~/components/VideoPlayer/Skeleton";

const VideoPlayer = () => {
  const params = useParams();
  const videoId = params.videoId as string;
  const iframeContainerRef = useRef<HTMLDivElement>(null);
  const [playerRefAtomValue, setPlayerRefAtom] = useAtom(playerRefAtom);
  const trimStart = useAtomValue(trimStartAtom);
  const trimEnd = useAtomValue(trimEndAtom);
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

  useEffect(() => {
    window.onYouTubeIframeAPIReady = initializePlayer;

    if (typeof YT !== "undefined" && YT.Player) {
      initializePlayer();
    }

    return () => {
      setPlayerRefAtom(null);
      setIsPlayerReadyAtom(false);
      setIsPlayingAtom(false);
    };
  }, []);

  useEffect(() => {
    if (trimStart && trimEnd && playerRefAtomValue) {
      playerRefAtomValue.cueVideoById({
        videoId,
        startSeconds: trimStart,
        endSeconds: trimEnd,
      });
    }
  }, [trimStart, trimEnd, playerRefAtomValue, videoId]);

  return (
    <div className="relative w-full max-w-[1000px] aspect-video">
      <div
        ref={iframeContainerRef}
        className="absolute top-0 left-0 w-full h-full"
      ></div>
      {!isPlayerReadyAtomValue && <SkeletonVideoPlayer />}
    </div>
  );
};

export default VideoPlayer;
