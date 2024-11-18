/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
/* eslint-disable import/prefer-default-export */
import * as d3 from "d3";
import {updateDots} from "./updateDots";

export function updateChart(
  event,
  x,
  y,
  xAxis,
  lines,
  brush,
  dotsArray,
  idleTimeout,
  idled
) {
  // extent - the selected area
  const extent = event.selection;

  dotsArray.forEach((dots) => {
    dots.selectAll(".dot").style("opacity", 0);
  });

  if (!extent) {
    if (!idleTimeout) return (idleTimeout = setTimeout(idled, 350));
    x.domain([4, 8]);
  } else {
    x.domain([x.invert(extent[0]), x.invert(extent[1])]);

    lines.forEach((line) => {
      line.select(".brush").call(brush.move, null);
    });
  }

  // update x axis with the new scale
  xAxis.transition().duration(1000).call(d3.axisBottom(x));

  // generate a new line path with the new x axis
  lines.forEach((line, i) => {
    line
      .select(".line")
      .transition()
      .duration(1000)
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
        // Show dots
        dotsArray[i].selectAll(".dot").style("opacity", 1);
      });
    updateDots(dotsArray[i], x, y);
  });
}
