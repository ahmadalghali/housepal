import { useEffect, useState } from "react";

export default function useMinsFormatter(mins: number): [{ timeAndFormatString: string }, number, string] {
  const [timeAndFormat, setTimeAndFormat] = useState<[number, string]>([0, "mins"]);
  useEffect(() => {
    if (mins >= 60) {
      const hours = +(mins / 60).toFixed(2);

      setTimeAndFormat([hours, "hrs"]);
    } else if (mins <= 59 && mins >= 2) {
      setTimeAndFormat([mins, "mins"]);
    } else if (mins == 1) {
      setTimeAndFormat([1, "min"]);
    } else {
      setTimeAndFormat([mins, "mins"]);
    }
  }, [mins]);

  return [{ timeAndFormatString: `${timeAndFormat[0]} ${timeAndFormat[1]}` }, timeAndFormat[0], timeAndFormat[1]];
}
