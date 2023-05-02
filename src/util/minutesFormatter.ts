export function formatMinutes(minutes: number) {
  if (minutes < 60) {
    return `${minutes} mins`;
  } else {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    const paddedMinutes = remainingMinutes.toString().padStart(2, "0");
    return `${hours}h ${paddedMinutes}m`;
  }
}
