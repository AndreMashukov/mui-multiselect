/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

const StackedBarChart = ({ width, height }) => {
  const ref = useRef();
  const [svg, setSvg] = useState(null);
  // set the dimensions and margins of the graph
  const margin = { top: 10, right: 30, bottom: 20, left: 50 };
  const _width = width || 460 - margin.left - margin.right;
  const _height = height || 400 - margin.top - margin.bottom;

  useEffect(() => {
    if (!svg) {
      setSvg(
        d3
          .select(ref.current)
          .append("svg")
          .attr("width", _width + margin.left + margin.right)
          .attr("height", _height + margin.top + margin.bottom)
          .append("g")
          .attr("transform", `translate(${margin.left},${margin.top})`)
      );
    } else {
      // Parse the Data
      d3.csv(
        "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/data_stacked.csv"
      ).then(function (data) {
        // List of subgroups = header of the csv files = soil condition here
        const subgroups = data.columns.slice(1);

        // List of groups = species here = value of the first column called group -> I show them on the X axis
        const groups = data.map((d) => d.group);

        // Add X axis
        const x = d3
          .scaleBand()
          .domain(groups)
          .range([0, _width])
          .padding([0.2]);
        svg
          .append("g")
          .attr("transform", `translate(0, ${_height})`)
          .call(d3.axisBottom(x).tickSizeOuter(0));

        // Add Y axis
        const y = d3.scaleLinear().domain([0, 60]).range([_height, 0]);
        svg.append("g").call(d3.axisLeft(y));

        // color palette = one color per subgroup
        const color = d3
          .scaleOrdinal()
          .domain(subgroups)
          .range(["#e41a1c", "#377eb8", "#4daf4a"]);

        //stack the data? --> stack per subgroup
        const stackedData = d3.stack().keys(subgroups)(data);

        // Show the bars
        svg
          .append("g")
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
          .attr("width", x.bandwidth());
      });
    }
  }, [svg]);

  return <div ref={ref}></div>;
};

export default StackedBarChart;
