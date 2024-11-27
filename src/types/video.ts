export interface VideoSnippet {
  title: string;
  description: string;
  publishedAt: string;
  channelId: string;
  channelTitle: string;
}

export interface VideoId {
  kind: string;
  videoId: string;
}

export interface VideoItem {
  kind: string;
  etag: string;
  id: VideoId;
  snippet: VideoSnippet;
}

export interface YouTubeResponse {
  kind: string;
  etag: string;
  items: VideoItem[];
  nextPageToken?: string;
  regionCode: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
}

export interface Metadata {
  currentPage: number;
  totalPages: number;
  totalItems: number;
}

export interface PaginatedResponse<T> {
  metadata: Metadata;
  data: T[];
}

export interface ErrorResponse {
  error: string;
  details?: string;
}

export interface CreateErrorResponse {
  message: string;
  status: number;
  details?: string;
}

export interface VideoQueryParams {
  page: number;
  limit: number;
  search: string;
}

declare global {
  interface Window {
    onYouTubeIframeAPIReady: () => void;
  }
}
