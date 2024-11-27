import React, { Suspense } from "react";
import { fetchVideos } from "~/services/videos";
import Pagination from "~/components/Pagination";
import { Search } from "~/components/Search";
import Sidebar from "~/components/SideBar";
import { VideosList } from "~/components/VideosList";
import { VideoListSkeleton } from "~/components/VideosList/Skeleton";
import { SearchParams } from "~/types";

const SideBarPage = async ({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) => {
  const props = await searchParams;
  const { page = "1", query = "" } = props;
  const { metadata } = await fetchVideos({
    page,
    search: query,
  });

  return (
    <Sidebar>
      <Sidebar.Header>
        <Search placeholder="Search videos" />
      </Sidebar.Header>
      <Sidebar.Content>
        <Suspense key={`${page}-${query}`} fallback={<VideoListSkeleton />}>
          <VideosList query={query} page={page} />
        </Suspense>
      </Sidebar.Content>
      <Sidebar.Footer>
        <Pagination
          totalPages={metadata.totalPages}
          currentPage={metadata.currentPage}
        />
      </Sidebar.Footer>
    </Sidebar>
  );
};

export default SideBarPage;
