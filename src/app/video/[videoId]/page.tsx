import VideoPlayer from "~/components/VideoPlayer";
import VideoControls from "~/components/VideoControls";

const VideoPage = () => {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-xl sm:text-3xl font-bold mb-12">
        Watch and Trim Video
      </h1>
      <VideoPlayer />
      <VideoControls />
    </div>
  );
};

export default VideoPage;
