/* eslint-disable no-plusplus */
// Assume thresholds is an array of objects:
// {value: number, color: string}
// Example: [{value: 30, color: "red"}].

const segmentData = (data) => {
  const segments = [];
  let currentSegment = [];

  for (let i = 0; i < data.length; i++) {
    const point = data[i];

    if (point.intersection) {
      // Complete the current segment and start a new one
      segments.push([...currentSegment, point]);
      currentSegment = [point];
    } else {
      currentSegment.push(point);
    }
  }

  if (currentSegment.length > 0) {
    segments.push(currentSegment);
  }

  return segments;
};

export default segmentData;
