import type { Metadata } from "next";
import "./globals.css";
import { JotaiProvider } from "~/components/JotaiProvider";

export const metadata: Metadata = {
  title: "YouTube Dashboard",
  description:
    "Senior Software Engineer Take-Home Assignment: YouTube Dashboard",
};

const RootLayout = async ({
  sidebar,
  children,
}: {
  children: React.ReactNode;
  sidebar: React.ReactNode;
}) => {
  return (
    <html lang="en">
      <body>
        <div className="h-screen">
          <div className="flex h-full">
            <aside className="flex-none">{sidebar}</aside>
            <main className="flex-1">
              <JotaiProvider>{children}</JotaiProvider>
            </main>
          </div>
        </div>
      </body>
    </html>
  );
};

export default RootLayout;
