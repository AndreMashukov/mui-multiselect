/* eslint-disable no-continue */
/* eslint-disable no-plusplus */
const interpolateNaNValues = (data) => {
  // Create a deep copy of the data
  const dataCopy = data.map((d) => ({...d, date: new Date(d.date)}));

  // Iterate over dataCopy
  for (let i = 0; i < dataCopy.length; i++) {
    if (!Number.isNaN(dataCopy[i].value)) {
      continue;
    }

    // Find previous non-NaN value
    let prevIndex = i - 1;
    while (prevIndex >= 0 && Number.isNaN(dataCopy[prevIndex].value)) {
      prevIndex--;
    }

    // Find next non-NaN value
    let nextIndex = i + 1;
    while (
      nextIndex < dataCopy.length &&
      Number.isNaN(dataCopy[nextIndex].value)
    ) {
      nextIndex++;
    }

    if (prevIndex >= 0 && nextIndex < dataCopy.length) {
      // Interpolate between prev and next
      const prev = dataCopy[prevIndex];
      const next = dataCopy[nextIndex];
      const t =
        (dataCopy[i].date.getTime() - prev.date.getTime()) /
        (next.date.getTime() - prev.date.getTime());
      dataCopy[i].value = prev.value + t * (next.value - prev.value);
    } else if (prevIndex >= 0) {
      // Use previous value
      dataCopy[i].value = dataCopy[prevIndex].value;
    } else if (nextIndex < dataCopy.length) {
      // Use next value
      dataCopy[i].value = dataCopy[nextIndex].value;
    } else {
      // No available values to interpolate
      dataCopy[i].value = null;
    }
  }

  return dataCopy;
};

export default interpolateNaNValues;
