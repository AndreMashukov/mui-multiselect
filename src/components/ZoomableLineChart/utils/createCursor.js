export const createCursor = (svg, height) => {
  const focus = svg
    .append("g")
    .append("line")
    .style("stroke", "black")
    .attr("stroke-dasharray", "5,5") // make the line dashed
    .attr("y1", 0)
    .attr("y2", height)
    .style("opacity", 0);

  const focusText = svg
    .append("g")
    .append("text")
    .style("opacity", 0)
    .attr("text-anchor", "left")
    .attr("alignment-baseline", "middle");

  return { focus, focusText };
};