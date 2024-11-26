import path from "path";
import { promises as fs } from "fs";
import { NextRequest, NextResponse } from "next/server";
import {
  VideoItem,
  YouTubeResponse,
  Metadata,
  PaginatedResponse,
} from "~/types";
import { createErrorResponse, parseQueryParams } from "~/utils";

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    // Parse and validate query parameters
    const { page, limit, search } = parseQueryParams(request.url);

    if (page <= 0 || limit <= 0) {
      return createErrorResponse({
        message: "Page and limit must be positive integers.",
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

    // Apply search filtering
    const filteredItems = search
      ? data.items.filter(
          (item) =>
            item.snippet.title.toLowerCase().includes(search) ||
            item.snippet.description.toLowerCase().includes(search)
        )
      : data.items;

    // Pagination logic
    const totalItems = filteredItems.length;
    const totalPages = Math.ceil(totalItems / limit);
    if (page > totalPages && totalPages !== 0) {
      return createErrorResponse({
        message: "Page exceeds total pages.",
        status: 404,
      });
    }

    const startIndex = (page - 1) * limit;
    const paginatedItems = filteredItems.slice(startIndex, startIndex + limit);

    // Construct metadata
    const metadata: Metadata = {
      currentPage: page,
      totalPages,
      totalItems,
    };

    // Construct the response
    const response: PaginatedResponse<VideoItem> = {
      metadata,
      data: paginatedItems,
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    return createErrorResponse({
      message: "Internal Server Error",
      status: 500,
      details: error instanceof Error ? error.message : undefined,
    });
  }
}
