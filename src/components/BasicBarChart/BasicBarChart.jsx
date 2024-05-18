import { useEffect, useRef } from "react";
import * as d3 from "d3";
import PropTypes from "prop-types";

const BasicBarChart = ({ data }) => {
  const ref = useRef();

  console.log(data);

  useEffect(() => {
    // Check if data is defined
    if (!data) {
      return;
    }
    // set the dimensions and margins of the graph
    const margin = { top: 10, right: 30, bottom: 90, left: 40 },
      width = 460 - margin.left - margin.right,
      height = 450 - margin.top - margin.bottom;

    d3.select(ref.current).selectAll("*").remove();
    let svg = d3.select(ref.current).select("svg");

    // append the svg object to the body of the page
    svg = d3
      .select(ref.current)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // X axis
    const x = d3
      .scaleBand()
      .range([0, width])
      .domain(data.map((d) => d.name))
      .padding(0.2);
    svg
      .append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");

    // Add Y axis
    const y = d3.scaleLinear().domain([0, 13000]).range([height, 0]);
    svg.append("g").call(d3.axisLeft(y));

    // Bars
    svg
      .selectAll("mybar")
      .data(data)
      .join("rect")
      .attr("x", (d) => x(d.name))
      .attr("width", x.bandwidth())
      .attr("fill", "#69b3a2")
      // no bar at the beginning thus:
      .attr("height", (d) => height - y(0)) // always equal to 0
      .attr("y", (d) => y(0));

    // Animation
    svg
      .selectAll("rect")
      .transition()
      .duration(800)
      .attr("y", (d) => y(d.value || 0)) // Use 0 if d.value is not a number
      .attr("height", (d) => height - y(d.value || 0)) // Use 0 if d.value is not a number
      .delay((d, i) => {
        // console.log(i);
        return i * 100;
      });
  }, [data]); // Add data to the dependency array

  return <div ref={ref}></div>;
};

export default BasicBarChart;

BasicBarChart.propTypes = {
  data: PropTypes.array,
};
