import React from "react";
import List from "~/components/List";
import Item from "~/components/List/ListItem";
import { fetchVideos } from "~/actions/videos";
import { VideosListProps } from "~/components/VideosList/types";

export const VideosList = async ({ query, page }: VideosListProps) => {
  const { data } = await fetchVideos({
    page,
    search: query,
  });

  return (
    <List
      items={data}
      keyExtractor={({ etag }) => etag}
      noItemsMessage="No videos found."
      renderItem={({ snippet, id }) => (
        <Item
          title={snippet.title}
          description={snippet.description}
          videoId={id.videoId}
        />
      )}
    />
  );
};
