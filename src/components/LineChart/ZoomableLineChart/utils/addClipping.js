export const addClipping = (svg, widthLocal, heightLocal) => {
  svg
    .append("defs")
    .append("svg:clipPath")
    .attr("id", "clip")
    .append("svg:rect")
    .attr("width", widthLocal)
    .attr("height", heightLocal)
    .attr("x", 0)
    .attr("y", 0);
};
