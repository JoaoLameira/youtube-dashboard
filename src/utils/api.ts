import { NextResponse } from "next/server";
import { ErrorResponse, VideoQueryParams, CreateErrorResponse } from "~/types";

// Helper function to validate and parse query parameters
export const parseQueryParams = (url: string): VideoQueryParams => {
  const { searchParams } = new URL(url);
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "10", 10);
  const search = searchParams.get("search")?.toLowerCase() || "";
  return { page, limit, search };
};

// Helper function to create a standardized error response
export const createErrorResponse = ({
  message,
  status,
  details,
}: CreateErrorResponse): NextResponse<ErrorResponse> => {
  return NextResponse.json({ error: message, details }, { status });
};
