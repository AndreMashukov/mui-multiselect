import * as d3 from "d3";

export const createAxes = ({svg, xScale, yScale, dimensions}) => {
  const {height} = dimensions;
  // axis X
  const xAxis = svg
    .append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(d3.axisBottom(xScale));

  // axis Y
  const yAxis = svg.append("g").call(d3.axisLeft(yScale));
  return {xAxis, yAxis};
};
