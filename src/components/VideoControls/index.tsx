"use client";

import { useAtom, useAtomValue } from "jotai";
import { isPlayerReadyAtom, isPlayingAtom, playerRefAtom } from "~/store";
import DualRangeSliderCustomLabel from "./DualRangeSliderCustomLabel";
import { PlayIcon, PauseIcon } from "@heroicons/react/24/outline";

interface VideoControlsProps {
  trimStart: number | undefined;
  trimEnd: number | undefined;
  onTrimChange: (e: number[]) => void;
}

const VideoControls: React.FC<VideoControlsProps> = ({
  trimStart,
  trimEnd,
  onTrimChange,
}) => {
  const playerRefAtomValue = useAtomValue(playerRefAtom);
  const isPlayerReadyAtomValue = useAtomValue(isPlayerReadyAtom);
  const [isPlaying, setIsPlaying] = useAtom(isPlayingAtom);

  const togglePlayPause = () => {
    if (playerRefAtomValue) {
      const playerState = playerRefAtomValue.getPlayerState();
      if (playerState === YT.PlayerState.PLAYING) {
        playerRefAtomValue.pauseVideo();
        setIsPlaying(false);
      } else {
        playerRefAtomValue.playVideo();
        setIsPlaying(true);
      }
    }
  };

  return (
    <div className="w-full max-w-[800px] mt-8">
      <div className="flex items-center justify-between space-x-8">
        {isPlayerReadyAtomValue && (
          <button
            onClick={togglePlayPause}
            className="border border-foreground p-2 rounded-lg"
          >
            {!isPlaying ? (
              <PlayIcon className="size-5" />
            ) : (
              <PauseIcon className="size-5" />
            )}
          </button>
        )}

        {playerRefAtomValue && isPlayerReadyAtomValue && (
          <DualRangeSliderCustomLabel
            maxDuration={playerRefAtomValue.getDuration()}
            trimStart={trimStart || 0}
            trimEnd={trimEnd || playerRefAtomValue.getDuration()}
            onTrimChange={onTrimChange}
          />
        )}
      </div>
    </div>
  );
};

export default VideoControls;
