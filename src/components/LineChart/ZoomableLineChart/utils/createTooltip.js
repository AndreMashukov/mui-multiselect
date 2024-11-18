/* eslint-disable import/prefer-default-export */
import * as d3 from "d3";

export const createTooltip = () => {
  const tooltip = d3
    .select("body")
    .append("div")
    .attr("class", "d3-tooltip")
    .style("position", "absolute")
    .style("background-color", "white")
    .style("border", "1px solid #ccc")
    .style("padding", "10px")
    .style("border-radius", "4px")
    .style("pointer-events", "none")
    .style("opacity", 0);

  return tooltip;
};
