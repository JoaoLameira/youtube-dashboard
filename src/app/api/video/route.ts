import path from "path";
import { promises as fs } from "fs";
import { NextRequest, NextResponse } from "next/server";
import { VideoItem, YouTubeResponse } from "~/types";
import { createErrorResponse } from "~/utils";

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    // Extract the video ID from the query parameters
    const url = new URL(request.url);
    const videoId = url.searchParams.get("id");

    if (!videoId) {
      return createErrorResponse({
        message: "Video ID is required.",
        status: 400,
      });
    }

    // Load and parse the JSON file
    const jsonDirectory = path.join(process.cwd(), "data");
    const fileContents = await fs.readFile(
      path.join(jsonDirectory, "data.json"),
      "utf8"
    );
    const data: YouTubeResponse = JSON.parse(fileContents);

    // Ensure `items` is an array
    if (!Array.isArray(data.items)) {
      return createErrorResponse({
        message: "Invalid data format: `items` array is missing.",
        status: 500,
      });
    }

    // Find the video by ID
    const video: VideoItem | undefined = data.items.find(
      (item) => item.id.videoId === videoId
    );

    if (!video) {
      return createErrorResponse({
        message: "Video not found.",
        status: 404,
      });
    }

    // Return the found video
    return NextResponse.json(video, { status: 200 });
  } catch (error) {
    return createErrorResponse({
      message: "Internal Server Error",
      status: 500,
      details: error instanceof Error ? error.message : undefined,
    });
  }
}
