export const addDots = (svg, data, x, y) => {
  const dotsGroup = svg.append("g").attr("clip-path", "url(#clip)");

  dotsGroup
    .selectAll(".dot")
    .data(data)
    .enter()
    .append("circle")
    .attr("class", "dot")
    .attr("cx", function (d) {
      return x(d.date);
    })
    .attr("cy", function (d) {
      return y(d.value);
    })
    .attr("r", 1.5)
    .attr("fill", "indigo");

  return dotsGroup;
};
