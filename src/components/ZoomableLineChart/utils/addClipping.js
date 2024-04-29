export const addClipping = (svg, _width, _height) => {
  svg
    .append("defs")
    .append("svg:clipPath")
    .attr("id", "clip")
    .append("svg:rect")
    .attr("width", _width)
    .attr("height", _height)
    .attr("x", 0)
    .attr("y", 0);
};
