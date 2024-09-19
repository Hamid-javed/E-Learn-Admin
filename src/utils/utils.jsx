export function convertTimestampToTime(timeInMS) {
  const timeInSeconds = timeInMS / 1000;
  const hours = Math.floor(timeInSeconds / 3600);
  const minutes = Math.floor((timeInSeconds % 3600) / 60);

  return `${hours} hours and ${minutes} minutes`;
}
export function convertTimestampToHours(timeInMS) {
  const timeInSeconds = timeInMS / 1000;
  const hours = Math.floor(timeInSeconds / 3600);

  return hours;
}
export function convertTimestampToMinutes(timeInMS) {
  const timeInSeconds = timeInMS / 1000;
  const minutes = Math.floor((timeInSeconds % 3600) / 60);
  return minutes;
}


