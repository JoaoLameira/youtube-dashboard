"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="w-full h-full flex flex-col justify-center items-center p-8">
      <h2 className="mb-1 text-lg font-bold">Something went wrong!</h2>
      <p className="mb-8 text-xs">{error.message}</p>
      <button
        className="p-4 text-white bg-neutral-800 hover:bg-neutral-700 rounded-lg"
        onClick={() => reset()}
      >
        Try again
      </button>
    </div>
  );
}
