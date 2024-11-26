export interface VideoPlayerProps {
  videoId: string;
  trimStart: number | undefined;
  trimEnd: number | undefined;
}

declare global {
  interface Window {
    onYouTubeIframeAPIReady: () => void;
  }
}
