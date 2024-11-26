import { useState } from "react";

function useLocalStorage<T>(
  videoId: string,
  key: string
): [T, (value: T) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === "undefined") return;

    try {
      const item = window.localStorage.getItem(`${key}_${videoId}`);
      return item ? JSON.parse(item) : undefined;
    } catch (error) {
      console.error(
        `Error reading ${key} for video ${videoId} from localStorage`,
        error
      );
      return;
    }
  });

  const setValue = (value: T) => {
    setStoredValue(value);
    if (typeof window !== "undefined") {
      try {
        window.localStorage.setItem(`${key}_${videoId}`, JSON.stringify(value));
      } catch (error) {
        console.error(
          `Error setting ${key} for video ${videoId} to localStorage`,
          error
        );
      }
    }
  };

  return [storedValue, setValue];
}

export default useLocalStorage;
