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

  const parseData = (data) => {
    const parseDate = d3.timeParse("%d %b %Y");
    data.forEach((d) => {
      d.date = parseDate(d.date);
    });
    return data;
  };

  const createSvg = (ref, width, height) => {
    const margin = { top: 10, right: 30, bottom: 30, left: 60 };

    return d3
      .select(ref)
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  };

  const addXAxis = (svg, data, width, height) => {
    const margin = { top: 10, right: 30, bottom: 30, left: 60 };
    const innerHeight = height - margin.top - margin.bottom;
    const innerWidth = width - margin.left - margin.right;

    const x = d3
      .scaleTime()
      .domain(d3.extent(data, (d) => d.date))
      .range([0, innerWidth])
      .nice(); // add padding to the scale
    svg
      .append("g")
      .attr("transform", "translate(0," + innerHeight + ")")
      .call(
        d3.axisBottom(x).ticks(data.length).tickFormat(d3.timeFormat("%d %b"))
      );
    return x;
  };

  const addYAxis = (svg, height) => {
    const y = d3.scaleLinear().domain([0, 200]).range([height, 0]);
    svg.append("g").call(d3.axisLeft(y));
    return y;
  };

  const addLine = (svg, data, x, y) => {
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
          .x((d) => (!isNaN(x(d.date)) ? x(d.date) : 0))
          .y((d) => y(d.value))
      );

    data.forEach((d) => {
      if (!isNaN(x(d.date))) {
        svg
          .append("circle")
          .attr("cx", x(d.date))
          .attr("cy", y(d.value))
          .attr("r", 5)
          .attr("fill", "white") // set the fill color to white
          .attr("stroke", "blue") // set the stroke color to blue
          .attr("stroke-width", 2); // set the stroke width to 2
      }
    });
  };

  const addCursor = (svg, width, height, xScale) => {
    const cursor = svg
      .append("line")
      .attr("stroke", "black")
      .attr("stroke-dasharray", "5,5") // make the line dashed
      .attr("y1", 0)
      .attr("y2", height);

    const xValues = data.map((d) => xScale(d.date));

    svg
      .append("rect")
      .attr("width", width)
      .attr("height", height)
      .attr("fill", "none")
      .attr("pointer-events", "all")
      .on("mousemove", function (event) {
        const mouseX = d3.pointer(event, this)[0];
        const closest = d3.least(xValues, (d) => Math.abs(d - mouseX));
        if (closest) {
          cursor.attr("x1", closest).attr("x2", closest);
        } else {
          cursor.attr("x1", mouseX).attr("x2", mouseX);
        }
      });
  };

  const initChart = () => {
    const parsedData = parseData(data);
    const svg = createSvg(svgRef.current, WIDTH, HEIGHT);
    const x = addXAxis(svg, parsedData, WIDTH, HEIGHT);
    const y = addYAxis(svg, HEIGHT);
    addLine(svg, parsedData, x, y);
    addCursor(svg, WIDTH, HEIGHT, x);
  };

  useEffect(() => {
    initChart();
  }, []);

  return <svg ref={svgRef}></svg>;
};

export default LineChart;
