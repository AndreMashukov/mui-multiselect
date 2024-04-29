import * as d3 from "d3";

export const createLine = (svg, data, x, y) => {
  const line = svg.append("g").attr("clip-path", "url(#clip)");

  line
    .append("path")
    .datum(data)
    .attr("class", "line")
    .attr("fill", "none")
    .attr("stroke", "steelblue")
    .attr("stroke-width", 1.5)
    .attr(
      "d",
      d3
        .line()
        .x(function (d) {
          return x(d.date);
        })
        .y(function (d) {
          return y(d.value);
        })
    );

  return line;
};