/* eslint-disable react/prop-types */
import React, { useRef, useEffect, useState } from "react";
import {
  select,
  scaleLinear,
  line,
  max,
  curveCardinal,
  axisBottom,
  axisLeft,
  zoom,
} from "d3";
import useResizeObserver from "../../hooks/useResizeObserver";

/**
 * Component that renders a ZoomableLineChart
 */

function ZoomableLineChart({ data, id = "myZoomableLineChart" }) {
  const svgRef = useRef();
  const wrapperRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);
  const [currentZoomState, setCurrentZoomState] = useState();

  // ...

// scales + line generator
const createScales = (data, dimensions, currentZoomState) => {
  const { width, height } = dimensions || wrapperRef.current.getBoundingClientRect();
  let xScale = scaleLinear()
    .domain([0, data.length - 1])
    .range([10, width - 10]);

  if (currentZoomState) {
    const newXScale = currentZoomState.rescaleX(xScale);
    xScale.domain(newXScale.domain());
  }

  const yScale = scaleLinear()
    .domain([0, max(data)])
    .range([height - 10, 10]);

  return { xScale, yScale };
};

const createLineGenerator = (xScale, yScale) => {
  return line()
    .x((d, index) => xScale(index))
    .y((d) => yScale(d))
    .curve(curveCardinal);
};

const renderLine = (svgContent, data, lineGenerator) => {
  svgContent
    .selectAll(".myLine")
    .data([data])
    .join("path")
    .attr("class", "myLine")
    .attr("stroke", "black")
    .attr("fill", "none")
    .attr("d", lineGenerator);
};

const renderDots = (svgContent, data, xScale, yScale) => {
  svgContent
    .selectAll(".myDot")
    .data(data)
    .join("circle")
    .attr("class", "myDot")
    .attr("stroke", "black")
    .attr("r", 4)
    .attr("fill", "orange")
    .attr("cx", (value, index) => xScale(index))
    .attr("cy", yScale);
};

const createAxes = (svg, xScale, yScale, height) => {
  const xAxis = axisBottom(xScale);
  svg
    .select(".x-axis")
    .attr("transform", `translate(0, ${height})`)
    .call(xAxis);

  const yAxis = axisLeft(yScale);
  svg.select(".y-axis").call(yAxis);
};

const createZoomBehavior = (svg, xScale, width, height, setCurrentZoomState) => {
  const zoomBehavior = zoom()
    .scaleExtent([0.5, 5])
    .translateExtent([
      [0, 0],
      [width, height],
    ])
    .on("zoom", (event) => {
      const zoomState = event.transform;
      setCurrentZoomState(zoomState);
    });

  svg.call(zoomBehavior);
};

// ...
  // will be called initially and on every data change
useEffect(() => {
  if (!dimensions) return;
  const svg = select(svgRef.current);
  const svgContent = svg.select(".content");

  const { xScale, yScale } = createScales(data, dimensions, currentZoomState);
  const lineGenerator = createLineGenerator(xScale, yScale);

  renderLine(svgContent, data, lineGenerator);
  renderDots(svgContent, data, xScale, yScale);
  createAxes(svg, xScale, yScale, dimensions.height);
  createZoomBehavior(svg, xScale, dimensions.width, dimensions.height, setCurrentZoomState);
}, [currentZoomState, data, dimensions]);




  return (
    <React.Fragment>
      <div ref={wrapperRef} style={{ marginBottom: "2rem" }}>
        <svg ref={svgRef}>
          <defs>
            <clipPath id={id}>
              <rect x="0" y="0" width="100%" height="100%" />
            </clipPath>
          </defs>
          <g className="content" clipPath={`url(#${id})`}></g>
          <g className="x-axis" />
          <g className="y-axis" />
        </svg>
      </div>
    </React.Fragment>
  );
}

export default ZoomableLineChart;