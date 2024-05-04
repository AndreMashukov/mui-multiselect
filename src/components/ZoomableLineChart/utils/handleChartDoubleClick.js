import * as d3 from "d3";
import { updateDots } from "./updateDots";

export const handleChartDoubleClick = (data, x, y, xAxis, line, dots) => {
  const xExtent = d3.extent(data, function (d) {
    return d.date;
  });

  // Subtract one day from the start of the xExtent
  const xStart = new Date(
    xExtent[0].getTime() - 0.05 * (xExtent[1] - xExtent[0])
  );

  x.domain([xStart, xExtent[1]]);
  xAxis.transition().call(d3.axisBottom(x));
  line
    .select(".line")
    .transition()
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
    )
    .on("end", () => {
      dots.selectAll(".dot").style("opacity", 1);
    });
  updateDots(dots, x, y);
};