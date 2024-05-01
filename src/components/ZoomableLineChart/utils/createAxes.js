import * as d3 from "d3";

export const createAxes = (svg, data, _width, _height) => {
  // scale X
  const xExtent = d3.extent(data, function (d) {
    return d.date;
  });

  // Subtract one day from the start of the xExtent
  const xStart = new Date(xExtent[0].getTime() - 0.05 * (xExtent[1] - xExtent[0]));

  const x = d3
    .scaleTime()
    .domain([xStart, xExtent[1]])
    .range([0, _width]);

  // axis X
  const xAxis = svg
    .append("g")
    .attr("transform", `translate(0, ${_height})`)
    .call(d3.axisBottom(x));

  // scale Y
  const y = d3
    .scaleLinear()
    .domain([
      0,
      d3.max(data, function (d) {
        return +d.value;
      }),
    ])
    .range([_height, 0]);

  // axis Y
  const yAxis = svg.append("g").call(d3.axisLeft(y));
  return { x, y, xAxis, yAxis };
};