import * as d3 from "d3";

export const createSvg = (ref, _width, _height, margin) => {
  const svg = d3
    .select(ref.current)
    .append("svg")
    .attr("width", _width + margin.left + margin.right)
    .attr("height", _height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  return svg;
};
