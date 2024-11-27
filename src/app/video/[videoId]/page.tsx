"use client";
import VideoPlayer from "~/components/VideoPlayer";
import VideoControls from "~/components/VideoControls";
import useLocalStorage from "~/hooks/useLocalStorage";
import { useParams } from "next/navigation";

const VideoPage = () => {
  const params = useParams();
  const videoId = params.videoId as string;

  const [trimStart, setTrimStart] = useLocalStorage<number | undefined>(
    videoId,
    "trimStart"
  );
  const [trimEnd, setTrimEnd] = useLocalStorage<number | undefined>(
    videoId,
    "trimEnd"
  );

  const handleTrimChange = (e: number[]) => {
    setTrimStart(e[0]);
    setTrimEnd(e[1]);
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-12">Watch and Trim Video</h1>
      <VideoPlayer videoId={videoId} trimStart={trimStart} trimEnd={trimEnd} />
      <VideoControls
        trimStart={trimStart}
        trimEnd={trimEnd}
        onTrimChange={handleTrimChange}
      />
    </div>
  );
};

export default VideoPage;
