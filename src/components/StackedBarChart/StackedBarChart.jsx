/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react";
import * as d3 from "d3";

const StackedBarChart = ({ data, width, height, setSelectedData }) => {
  const ref = useRef();
  // set the dimensions and margins of the graph
  const margin = { top: 10, right: 30, bottom: 20, left: 50 };
  const _width = width || 460 - margin.left - margin.right;
  const _height = height || 400 - margin.top - margin.bottom;

  const createAxes = (svg, _width, _height, groups) => {
    // Add X axis
    const x = d3.scaleBand().domain(groups).range([0, _width]).padding([0.2]);
    svg
      .append("g")
      .attr("transform", `translate(0, ${_height})`)
      .call(d3.axisBottom(x).tickSizeOuter(0));

    // Add Y axis
    const y = d3.scaleLinear().domain([0, 60]).range([_height, 0]);
    svg.append("g").attr("class", "y-axis").call(d3.axisLeft(y));

    return { x, y };
  };

  const createClipPath = (svg, _width, _height) => {
    // Define a clipPath: everything out of this area won't be drawn.
    const clip = svg
      .append("defs")
      .append("svg:clipPath")
      .attr("id", "clip")
      .append("svg:rect")
      .attr("width", _width)
      .attr("height", _height)
      .attr("x", 0)
      .attr("y", 0);

    return clip;
  };

  const drawChart = (svg, data, _width, _height) => {
    // List of subgroups = header of the csv files = soil condition here
    const subgroups = data.columns.slice(1);

    // List of groups = species here = value of the first column called group -> I show them on the X axis
    const groups = data.map((d) => d.group);

    const { x, y } = createAxes(svg, _width, _height, groups);
    // color palette = one color per subgroup
    const color = d3
      .scaleOrdinal()
      .domain(subgroups)
      .range(["#e41a1c", "#377eb8", "#4daf4a"]);

    //stack the data? --> stack per subgroup
    const stackedData = d3.stack().keys(subgroups)(data);
    createClipPath(svg, _width, _height);
    // Show the bars
    const bars = svg
      .append("g")
      .attr("clip-path", "url(#clip)") // Apply the clip path to the bars only
      .selectAll("g")
      // Enter in the stack data = loop key per key = group per group
      .data(stackedData)
      .join("g")
      .attr("fill", (d) => color(d.key))
      .selectAll("rect")
      // enter a second time = loop subgroup per subgroup to add all rectangles
      .data((d) => d)
      .join("rect")
      .attr("x", (d) => x(d.data.group))
      .attr("y", (d) => y(d[1]))
      .attr("height", (d) => y(d[0]) - y(d[1]))
      .attr("width", x.bandwidth())
      .on("click", (event, d) => {
        const selected = {
          group: d.data.group,
          data: Object.keys(d.data)
            .slice(1)
            .map((key) => ({ name: key, value: parseInt(d.data[key])})),
        };
        // console.log(selected);
        setSelectedData(selected);
      });

    const zoom = d3
      .zoom()
      .scaleExtent([1, 10])
      .on("zoom", (event) => {
        // When zoomed, update the bars and the Y axis
        const newY = event.transform.rescaleY(y);
        bars
          .attr("y", (d) => newY(d[1]))
          .attr("height", (d) => newY(d[0]) - newY(d[1]));
        svg.select(".y-axis").call(d3.axisLeft(newY));
      });

    // Apply the zoom behavior to the SVG
    svg.call(zoom);
  };

  useEffect(() => {
    d3.select(ref.current).selectAll("*").remove();
    let svg = d3.select(ref.current).select("svg");
    svg.call(d3.zoom().on("zoom", null));

    if (svg.empty()) {
      svg = d3
        .select(ref.current)
        .append("svg")
        .attr("width", _width + margin.left + margin.right)
        .attr("height", _height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);
    }

    drawChart(svg, data, _width, _height);
  }, [data]);

  return <div ref={ref}></div>;
};

export default StackedBarChart;
