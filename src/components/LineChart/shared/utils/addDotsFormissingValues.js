import * as Plot from "@observablehq/plot";
import getTitle from "./getTitle";

const createMissingValueDots = (segment, initialData, color) => {
  const pointMap = new Map();

  initialData.forEach((point) => {
    const pointKey = `${point.date.getTime()}-${point.value}`;
    pointMap.set(pointKey, point);
  });
  const missingValuesCircles = Plot.dot(
    segment
      .filter((p) => p.missingValue)
      .filter((p) => !pointMap.has(`${p.date.getTime()}-${p.value}`)),
    {
      x: "date",
      y: "value",
      fill: "white",
      r: 10,
      symbol: "circle",
      title: (d) => getTitle(d, color),
    }
  );

  const missingValuesCrosses = Plot.dot(
    segment
      .filter((p) => p.missingValue)
      .filter((p) => !pointMap.has(`${p.date.getTime()}-${p.value}`)),
    {
      x: "date",
      y: "value",
      fill: "grey",
      r: 4,
      symbol: "cross",
      title: (d) => getTitle(d, color),
    }
  );

  return [missingValuesCircles, missingValuesCrosses];
};

export default createMissingValueDots;
