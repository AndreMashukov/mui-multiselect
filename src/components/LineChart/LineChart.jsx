import * as d3 from "d3";
import { useEffect, useRef } from "react";

// Sample data
const data = [
  { date: "1 Jan 2000", value: 100 },
  { date: "1 Feb 2000", value: 120 },
  { date: "1 Mar 2000", value: 140 },
  { date: "1 Apr 2000", value: 130 },
  { date: "1 May 2000", value: 150 },
];

const HEIGHT = 600;
const WIDTH = 600;

const LineChart = () => {
  const svgRef = useRef();

  const initChart = () => {
    const parseDate = d3.timeParse("%d %b %Y");
    data.forEach((d) => {
      d.date = parseDate(d.date);
    });

    // Set the dimensions and margins of the graph
    const margin = { top: 10, right: 30, bottom: 30, left: 60 },
      width = WIDTH - margin.left - margin.right,
      height = HEIGHT - margin.top - margin.bottom;

    // Append the svg object to the body of the page
    const svg = d3
      .select(svgRef.current)
      .attr("width", WIDTH)
      .attr("height", HEIGHT)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Add X axis
    const x = d3
      .scaleTime()
      .domain(d3.extent(data, (d) => d.date))
      .range([0, width]);
    svg
      .append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x).tickFormat(d3.timeFormat("%d %b")));

    // Add Y axis
    const y = d3.scaleLinear().domain([0, 200]).range([height, 0]);
    svg.append("g").call(d3.axisLeft(y));

    // Add the line
    svg
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr(
        "d",
        d3
          .line()
          .x((d) => x(d.date))
          .y((d) => y(d.value))
      );
  };

  useEffect(() => {
    initChart();
  }, []);

  return <svg ref={svgRef}></svg>;
};

export default LineChart;
