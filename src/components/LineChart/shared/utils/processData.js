/* eslint-disable no-restricted-syntax */
/* eslint-disable no-shadow */
/* eslint-disable no-plusplus */

import addIntersectionPoints from "./addIntersectionPoints";
import interpolateNaNValues from "./interpolateNaNValues";

// Function to check and update missingValue for intersection points
const updateMissingValueForIntersections = (data) => {
  for (let i = 0; i < data.length; i++) {
    const point = data[i];
    if (point.intersection) {
      const prevPoint = data[i - 1];
      const nextPoint = data[i + 1];
      if (
        (prevPoint && prevPoint.missingValue) ||
        (nextPoint && nextPoint.missingValue)
      ) {
        point.missingValue = true;
      }
    }
  }
};

const processData = (data, thresholds) => {
  // Interpolate missing values
  const cleanData = interpolateNaNValues(data);

  // Add intersection points
  const dataWithIntersections = addIntersectionPoints(cleanData, thresholds);

  const resultData = [];
  const pointMap = new Map();

  let originalIndex = 0;

  for (let i = 0; i < dataWithIntersections.length; i++) {
    const interpolatedPoint = dataWithIntersections[i];

    // Find the corresponding original data point
    let originalPoint = data[originalIndex];
    if (
      originalPoint &&
      originalPoint.date.getTime() === interpolatedPoint.date.getTime()
    ) {
      originalIndex++;
    } else {
      originalPoint = {value: interpolatedPoint.value};
    }

    const missingValue = !Number.isFinite(originalPoint.value);

    // Determine thresholdColor based on thresholds
    let thresholdColor = null;
    for (const thresholdObj of thresholds) {
      if (interpolatedPoint.value >= thresholdObj.value) {
        thresholdColor = thresholdObj.color;
      }
    }

    const newDataPoint = {
      date: interpolatedPoint.date,
      value: interpolatedPoint.value,
      missingValue,
      thresholdColor,
      intersection: interpolatedPoint.intersection || false,
    };

    // Include thresholdValue and thresholdColor from intersection point if available
    if (interpolatedPoint.intersection) {
      // newDataPoint.thresholdValue = interpolatedPoint.thresholdValue;
      newDataPoint.thresholdColor = interpolatedPoint.thresholdColor;
    }

    // Create a unique key for the point
    const pointKey = `${newDataPoint.date.getTime()}-${newDataPoint.value}`;

    // Avoid adding duplicate points and update intersection if needed
    if (!pointMap.has(pointKey)) {
      resultData.push(newDataPoint);
      pointMap.set(pointKey, newDataPoint);
    } else if (newDataPoint.intersection) {
      const existingPoint = pointMap.get(pointKey);
      existingPoint.intersection = true;
      // existingPoint.thresholdValue = newDataPoint.thresholdValue;
      existingPoint.thresholdColor = newDataPoint.thresholdColor;
    }
  }

  // Ensure the last point is added if it's not a duplicate
  if (
    originalIndex < data.length &&
    (resultData.length === 0 ||
      resultData[resultData.length - 1].value !== data[data.length - 1].value)
  ) {
    const lastOriginalPoint = data[data.length - 1];
    let thresholdColor = null;
    for (const thresholdObj of thresholds) {
      if (lastOriginalPoint.value >= thresholdObj.value) {
        thresholdColor = thresholdObj.color;
      }
    }
    const lastDataPoint = {
      date: lastOriginalPoint.date,
      value: lastOriginalPoint.value,
      missingValue: !Number.isFinite(lastOriginalPoint.value),
      thresholdColor,
      intersection: false,
    };

    const lastPointKey = `${lastDataPoint.date.getTime()}-${lastDataPoint.value}`;

    if (!pointMap.has(lastPointKey)) {
      resultData.push(lastDataPoint);
      pointMap.set(lastPointKey, lastDataPoint);
    }
  }

  // Update missingValue for intersection points
  updateMissingValueForIntersections(resultData);

  resultData.sort((a, b) => a.date - b.date);
  return resultData;
};

export default processData;
