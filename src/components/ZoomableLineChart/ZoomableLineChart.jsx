/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { useZoomableLineChart } from "./useZoomableLineChart";
import * as d3 from "d3";

const WIDTH = 800;
const HEIGHT = 400;

const ZoomableLineChart = ({ dataArray, width, height, colors }) => {
  const margin = { top: 10, right: 30, bottom: 30, left: 60 };
  const _width = (width || WIDTH) - margin.left - margin.right;
  const _height = (height || HEIGHT) - margin.top - margin.bottom;

  // const data = dataArray[0];

  const props = {
    dataArray,
    _width,
    _height,
    margin,
  };

  const {
    ref,
    svg,
    createAxes,
    addClipping,
    createLine,
    addDots,
    createBrush,
    updateChart,
    handleChartDoubleClick,
    createCursor,
    handleMoveCursor,
  } = useZoomableLineChart(props);

  useEffect(() => {
    if (!svg) return;

    const brush = createBrush();

    const { x, y, xAxis } = createAxes(dataArray[0]); // Use the first data array to create the axes
    dataArray.forEach((data, index) => {
      addClipping();
      // Update the domain of the scales for each dataset
      x.domain(d3.extent(data, (d) => d.date));
      y.domain([0, d3.max(data, (d) => +d.value)]);
      const line = createLine(data, x, y, colors[index]);
      const dots = addDots(data, x, y);

      brush.on("end", (event) =>
        updateChart(event, x, y, xAxis, line, brush, dots)
      );
      line.append("g").attr("class", "brush").call(brush);

      svg.on("dblclick", () =>
        handleChartDoubleClick(data, x, y, xAxis, line, dots)
      );

      svg.on("click", () => {
        setTimeout(() => {
          dots.selectAll(".dot").style("opacity", 1);
        }, 500);
      });

      const { focus, focusText } = createCursor();

      svg
        .on("mouseover", function () {
          focus.style("opacity", 1);
          focusText.style("opacity", 1);
        })
        .on("mousemove", (event) =>
          handleMoveCursor(event, data, x, y, focus, focusText)
        )
        .on("mouseout", function () {
          focus.style("opacity", 0);
          focusText.style("opacity", 0);
        });
    });
  }, [svg, dataArray]);

  return <div ref={ref}></div>;
};

export default ZoomableLineChart;
