"use client";
import { useAtom, useAtomValue } from "jotai";
import { isPlayerReadyAtom, isPlayingAtom, playerRefAtom } from "~/store";
import DualRangeSliderCustomLabel from "~/components/VideoControls/RangeSlider";
import { PlayIcon, PauseIcon } from "@heroicons/react/24/outline";
import SkeletonVideoControls from "~/components/VideoControls/Skeleton";

const VideoControls: React.FC = () => {
  const playerRefAtomValue = useAtomValue(playerRefAtom);
  const isPlayerReadyAtomValue = useAtomValue(isPlayerReadyAtom);
  const [isPlaying, setIsPlaying] = useAtom(isPlayingAtom);
  const maxDuration =
    (playerRefAtomValue && playerRefAtomValue.getDuration()) || 0;

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

  if (!isPlayerReadyAtomValue) return <SkeletonVideoControls />;

  return (
    <div className="w-full max-w-[1000px] mt-8">
      <div className="flex items-center justify-between space-x-8">
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

        <DualRangeSliderCustomLabel maxDuration={maxDuration} />
      </div>
    </div>
  );
};

export default VideoControls;
