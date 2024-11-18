/* eslint-disable no-continue */
import interpolateNaNValues from "./interpolateNaNValues";

/* eslint-disable no-plusplus */

const addIntersectionPoints = (data, thresholds) => {
  // Interpolate NaN values in the data
  const dataCopy = interpolateNaNValues(data).map((d) => ({
    ...d,
    date: new Date(d.date),
  }));

  const sortedThresholds = thresholds;

  // Iterate through the data to find intersection points
  for (let i = 1; i < dataCopy.length; i++) {
    const prev = dataCopy[i - 1];
    const curr = dataCopy[i];

    // Skip if either value is NaN
    if (Number.isNaN(prev.value) || Number.isNaN(curr.value)) {
      continue;
    }

    // Check for intersections with each threshold
    sortedThresholds.forEach((thresholdObj) => {
      const {value: thresholdValue, color: thresholdColor} = thresholdObj;

      // Check if the line crosses the threshold
      if (
        (prev.value < thresholdValue && curr.value >= thresholdValue) ||
        (prev.value >= thresholdValue && curr.value < thresholdValue)
      ) {
        // Calculate the intersection point using linear interpolation
        const t = (thresholdValue - prev.value) / (curr.value - prev.value);
        const intersectionDate = new Date(
          prev.date.getTime() + t * (curr.date.getTime() - prev.date.getTime())
        );

        // Create the intersection point
        const intersectionPoint = {
          date: intersectionDate,
          value: thresholdValue,
          intersection: true,
          thresholdValue,
          thresholdColor,
        };

        // Insert the intersection point into the data copy
        dataCopy.splice(i, 0, intersectionPoint);

        // Move to the next point to avoid processing this intersection again
        i++;
      }
    });
  }

  return dataCopy;
};

export default addIntersectionPoints;
