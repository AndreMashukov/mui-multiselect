/* eslint-disable no-plusplus */
// getSegmentColor.js

const getSegmentColor = (segment, thresholds) => {
  if (!thresholds || thresholds.length === 0) return null;

  // Sort thresholds in descending order by value
  const sortedThresholds = thresholds;

  const firstPoint = segment[0];
  const lastPoint = segment[segment.length - 1];

  // If the first point is below the lowest threshold, return null
  if (firstPoint.value < sortedThresholds[sortedThresholds.length - 1].value) {
    return null;
  }

  // If first point is at the lowest threshold and last point is below it, return null
  if (
    firstPoint.value === sortedThresholds[sortedThresholds.length - 1].value &&
    lastPoint.value < sortedThresholds[sortedThresholds.length - 1].value
  ) {
    return null;
  }

  // If last point is equal to the first point, take the second point and determine color
  if (firstPoint.value === lastPoint.value) {
    if (segment.length < 2) return null; // Prevent infinite recursion
    return getSegmentColor(segment.slice(1), thresholds);
  }

  // Iterate through thresholds from highest to lowest
  for (let i = 0; i < sortedThresholds.length; i++) {
    const threshold = sortedThresholds[i];
    // Check if the first and last points meet or exceed the current threshold
    if (
      firstPoint.value >= threshold.value &&
      lastPoint.value >= threshold.value
    ) {
      return threshold.color;
    }
  }

  // If no thresholds are met, return null
  return null;
};

export {getSegmentColor};
