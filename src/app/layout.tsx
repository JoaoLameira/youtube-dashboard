import type { Metadata } from "next";
import "./globals.css";
import { JotaiProvider } from "~/components/JotaiProvider";
import { Inter, Roboto_Mono } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const roboto_mono = Roboto_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto-mono",
});

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
    <html lang="en" className={`${inter.variable} ${roboto_mono.variable}`}>
      <body>
        <JotaiProvider>
          <div className="h-screen flex overflow-hidden relative">
            <aside className={"flex-none"}>{sidebar}</aside>
            <main className={"flex-1"}>{children}</main>
          </div>
        </JotaiProvider>
      </body>
    </html>
  );
};

export default RootLayout;
