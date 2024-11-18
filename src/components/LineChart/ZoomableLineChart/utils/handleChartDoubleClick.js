import * as d3 from "d3";
import {updateDots} from "./updateDots";

export const handleChartDoubleClick = (
  dataArray,
  x,
  y,
  xAxis,
  lines,
  dotsArray
) => {
  const xExtent = d3.extent(
    dataArray.flatMap((data) => data),
    (d) => d.date
  );

  // Subtract one day from the start of the xExtent
  const xStart = new Date(
    xExtent[0].getTime() - 0.05 * (xExtent[1].getTime() - xExtent[0].getTime())
  );

  x.domain([xStart, xExtent[1]]);
  xAxis.transition().call(d3.axisBottom(x));

  lines.forEach((line, i) => {
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
        dotsArray[i].selectAll(".dot").style("opacity", 1);
      });
    updateDots(dotsArray[i], x, y);
  });
};
