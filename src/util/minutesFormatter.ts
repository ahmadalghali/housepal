export function formatMinutes(mins: number): [{ timeAndFormatString: string }, number, string] {
  let timeAndFormat: [number, string] = [0, "mins"];
  if (mins >= 60) {
    const hours = +(mins / 60).toFixed(2);

    timeAndFormat = [hours, "hrs"];
  } else if (mins <= 59 && mins >= 2) {
    timeAndFormat = [mins, "mins"];
  } else if (mins == 1) {
    timeAndFormat = [1, "min"];
  } else {
    timeAndFormat = [mins, "mins"];
  }

  return [{ timeAndFormatString: `${timeAndFormat[0]} ${timeAndFormat[1]}` }, timeAndFormat[0], timeAndFormat[1]];
}

export function formatMinutesToHours(mins: number) {
  const hours = Math.floor(mins / 60);
  const remainingMins = mins % 60;

  const hoursStr = hours > 0 ? `${hours}h` : "0h";
  const minsStr = remainingMins > 0 ? `${remainingMins}m` : "00m";

  return `${hoursStr} ${minsStr}`.trim();
}
