import React, { ReactNode } from "react";
import Script from "next/script";
import { MainView } from "~/components/MainView";

const VideoLayout = ({ children }: { children: ReactNode }) => {
  return (
    <MainView>
      {children}
      <Script src="https://www.youtube.com/iframe_api" />
    </MainView>
  );
};

export default VideoLayout;
