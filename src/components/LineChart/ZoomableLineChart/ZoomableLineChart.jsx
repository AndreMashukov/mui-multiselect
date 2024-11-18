import React, {useEffect} from "react";
import PropTypes from "prop-types";
import {useZoomableLineChart} from "./useZoomableLineChart";
import ChartLegend from "../shared/ChartLegend/ChartLegend";

const WIDTH = 800;
const HEIGHT = 400;

const ZoomableLineChart = ({dataArray, width, height, colors, labels}) => {
  const margin = {top: 10, right: 30, bottom: 30, left: 60};
  const widthLocal = (width || WIDTH) - margin.left - margin.right;
  const heightLocal = (height || HEIGHT) - margin.top - margin.bottom;

  const props = {
    dataArray,
    widthLocal,
    heightLocal,
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
    createTooltip,
  } = useZoomableLineChart(props);

  useEffect(() => {
    if (!svg) return;

    const brush = createBrush();
    const {xScale, yScale} = scale;
    const {xAxis} = createAxes(xScale, yScale);
    addClipping();

    const {focus, focusText} = createCursor();
    const tooltip = createTooltip(); // Ensure tooltip is created

    svg
      .on("mouseover", () => {
        focus.style("opacity", 1);
        focusText.style("opacity", 1);
      })
      .on("mouseout", () => {
        focus.style("opacity", 0);
        focusText.style("opacity", 0);
        tooltip.style("opacity", 0);
      });

    const linesArray = [];
    const dotsArray = [];

    dataArray.forEach((data, index) => {
      const line = createLine(data, xScale, yScale, colors[index]);
      const dots = addDots(data, xScale, yScale);

      line.append("g").attr("class", "brush").call(brush);

      linesArray.push(line);
      dotsArray.push(dots);
    });

    svg.on("click", () => {
      setTimeout(() => {
        dotsArray.forEach((dots) => {
          dots.selectAll(".dot").style("opacity", 1);
        });
      }, 500);
    });

    svg.on("mousemove", (event) => {
      handleMoveCursor(
        event,
        dataArray,
        xScale,
        yScale,
        focus,
        focusText,
        tooltip, // Pass tooltip to handleMoveCursor
        colors
      );
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [svg, dataArray, scale]);

  return (
    <>
      <div data-testid="zoomable-line-chart" ref={ref}></div>
      <ChartLegend colors={colors} labels={labels} width={widthLocal} />
    </>
  );
};

ZoomableLineChart.propTypes = {
  dataArray: PropTypes.array.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  colors: PropTypes.array.isRequired,
  labels: PropTypes.array.isRequired,
  threshold: PropTypes.number,
};

export default ZoomableLineChart;
