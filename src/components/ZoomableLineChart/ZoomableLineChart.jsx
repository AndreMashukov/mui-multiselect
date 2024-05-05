/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useZoomableLineChart } from "./useZoomableLineChart";
import * as d3 from "d3";

const WIDTH = 800;
const HEIGHT = 400;

const ZoomableLineChart = ({ dataArray, width, height, colors }) => {
  const [currentZoomState, setCurrentZoomState] = useState(d3.zoomIdentity);
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
    createScales,
  } = useZoomableLineChart(props);

  useEffect(() => {
    if (!svg) return;

    const brush = createBrush();

    dataArray.forEach((data, index) => {
      addClipping();
      const { xScale, yScale } = createScales(data, currentZoomState); 
      const { xAxis } = createAxes(xScale, yScale); 
      const line = createLine(data, xScale, yScale, colors[index]);
      const dots = addDots(data, xScale, yScale);

      brush.on("end", (event) => {
        setCurrentZoomState(event.transform);
        updateChart(event, xScale, yScale, xAxis, line, brush, dots);
      });

      line.append("g").attr("class", "brush").call(brush);

      svg.on("dblclick", () =>
        handleChartDoubleClick(data, xScale, yScale, xAxis, line, dots)
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
          handleMoveCursor(event, data, xScale, yScale, focus, focusText)
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
