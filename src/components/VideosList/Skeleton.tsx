import React from "react";

export const VideoListSkeleton = () => {
  const elements = Array(20).fill({});
  return (
    <div className="space-y-4">
      {elements.map((_, index) => (
        <div
          key={`video-list-${index}`}
          className="w-full h-28 bg-neutral-700 animate-pulse rounded-lg"
        ></div>
      ))}
    </div>
  );
};
