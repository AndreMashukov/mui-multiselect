import * as d3 from "d3";

export const createScale = (dataArray, dimensions, currentZoomState) => {
  const { width, height } = dimensions || { width: 0, height: 0 };

  // Find the minimum and maximum date across all datasets
  const xExtent = d3.extent(
    dataArray.flatMap((data) => (data.data ? data.data : [])),
    (d) => (d && d.date ? d.date : new Date())
  );

  let xStart;
  if (xExtent[0]) {
    xStart = new Date(
      xExtent[0].getTime() -
        0.05 * (xExtent[1].getTime() - xExtent[0].getTime())
    );
  } else {
    xStart = new Date();
  }

  const xScale = d3.scaleTime().domain([xStart, xExtent[1]]).range([0, width]);

  if (currentZoomState) {
    const newXScale = currentZoomState.rescaleX(xScale);
    xScale.domain(newXScale.domain());
  }

  // Find the maximum value across all datasets
  const yMax = d3.max(
    dataArray.flatMap((data) => (data.data ? data.data : [])),
    (d) => (d && d.value ? d.value : 0)
  );

  const yScale = d3.scaleLinear().domain([0, yMax]).range([height, 0]);

  return { xScale, yScale };
};