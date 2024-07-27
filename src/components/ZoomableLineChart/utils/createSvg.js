import * as d3 from "d3";

export const createSvg = (ref, widthLocal, heightLocal, margin) => {
  const svg = d3
    .select(ref.current)
    .append("svg")
    .attr("width", widthLocal + margin.left + margin.right)
    .attr("height", heightLocal + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  return svg;
};
