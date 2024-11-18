export const updateDots = (dots, x, y) => {
  dots
    .selectAll(".dot")
    .attr("cx", (d) => x(d.date))
    .attr("cy", (d) => y(d.value));
  // .style("opacity", opacity);
};
