export const secondsToMinutes = (seconds: number | undefined) => {
  if (!seconds) return { minutes: 0, remainingSeconds: `00` };

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  if (remainingSeconds < 10) {
    return { minutes, remainingSeconds: `0${remainingSeconds}` };
  }

  return { minutes, remainingSeconds };
};
