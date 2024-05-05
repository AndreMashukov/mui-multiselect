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
    setCurrentZoomState,
    scale,
  } = useZoomableLineChart(props);

  useEffect(() => {
    if (!svg) return;

    const brush = createBrush();
    const { xScale, yScale } = scale;
    const { xAxis } = createAxes(xScale, yScale);
    addClipping();

    const { focus, focusText } = createCursor();

    svg
      .on("mouseover", function () {
        focus.style("opacity", 1);
        focusText.style("opacity", 1);
      })
      .on("mouseout", function () {
        focus.style("opacity", 0);
        focusText.style("opacity", 0);
      });

    const linesArray = [];
    const dotsArray = [];
    dataArray.forEach((data, index) => {
      const line = createLine(data, xScale, yScale, colors[index]);
      const dots = addDots(data, xScale, yScale);

      line.append("g").attr("class", "brush").call(brush);

      svg.on("click", () => {
        setTimeout(() => {
          dots.selectAll(".dot").style("opacity", 1);
        }, 500);
      });

      svg.on("mousemove", (event) =>
        handleMoveCursor(event, data, xScale, yScale, focus, focusText)
      );
      linesArray.push(line);
      dotsArray.push(dots);
    });
  
    svg.on("dblclick", () =>
      handleChartDoubleClick(
        dataArray,
        xScale,
        yScale,
        xAxis,
        linesArray,
        dotsArray
      )
    );
    brush.on("end", (event) => {
      setCurrentZoomState(event.transform);
      updateChart(event, xScale, yScale, xAxis, linesArray, brush, dotsArray);
    });
  }, [svg, dataArray, scale]);

  return <div ref={ref}></div>;
};

export default ZoomableLineChart;
