export const secondsToHMS = (time: number | undefined) => {
  if (time === undefined) {
    return "00:00";
  }

  const dateObj = new Date(time * 1000);
  const hours = dateObj.getUTCHours();
  const minutes = dateObj.getUTCMinutes();
  const seconds = dateObj.getSeconds();

  const timeString =
    hours.toString().padStart(2, "0") +
    ":" +
    minutes.toString().padStart(2, "0") +
    ":" +
    seconds.toString().padStart(2, "0");

  return timeString;
};
