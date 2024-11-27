import { PaginatedResponse, VideoItem } from "~/types";
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

interface GetVideosProps {
  page: string;
  limit?: string;
  search?: string;
}

// Should be cached for 1 hour
export const fetchVideos = async ({
  page,
  limit = "10",
  search = "",
}: GetVideosProps): Promise<PaginatedResponse<VideoItem>> => {
  try {
    const query = new URLSearchParams({
      page,
      limit,
      search: encodeURIComponent(search),
    }).toString();

    const url = `${API_URL}/videos?${query}`;

    const res = await fetch(url, {
      cache: "force-cache",
      next: {
        revalidate: 3600,
      },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch videos: ${res.statusText}`);
    }

    const data: PaginatedResponse<VideoItem> = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching videos:", error);
    throw error;
  }
};

interface GetVideoByIdProps {
  id: string;
}

// Should be cached for 1 hour
export const fetchVideoById = async ({
  id,
}: GetVideoByIdProps): Promise<VideoItem> => {
  try {
    const query = new URLSearchParams({
      id,
    }).toString();

    const url = `${API_URL}/video?${query}`;

    const res = await fetch(url, {
      cache: "force-cache",
      next: {
        revalidate: 3600,
      },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch videos: ${res.statusText}`);
    }

    const data: VideoItem = await res.json();

    return data;
  } catch (error) {
    console.error("Error fetching videos:", error);
    throw error;
  }
};
