import * as d3 from "d3";

export const createScales = (data, dimensions, currentZoomState) => {
  const { width, height } = dimensions || { width: 0, height: 0 };

  // scale X
  const xExtent = d3.extent(data, function (d) {
    return d.date;
  });

  // Subtract one day from the start of the xExtent
  let xStart;
  if (xExtent[0]) {
    xStart = new Date(
      xExtent[0].getTime() - 0.05 * (xExtent[1] - xExtent[0])
    );
  } else {
    xStart = new Date();
  }

  const xScale = d3.scaleTime().domain([xStart, xExtent[1]]).range([0, width]);

  if (currentZoomState) {
    const newXScale = currentZoomState.rescaleX(xScale);
    xScale.domain(newXScale.domain());
  }

  // scale Y
  const yScale = d3
    .scaleLinear()
    .domain([
      0,
      d3.max(data, function (d) {
        return +d.value;
      }),
    ])
    .range([height, 0]);

  return { xScale, yScale };
};
