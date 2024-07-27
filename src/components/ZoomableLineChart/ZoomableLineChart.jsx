/* eslint-disable react/prop-types */
import {useEffect, useState} from "react";
import {useZoomableLineChart} from "./useZoomableLineChart";
import {CurrentPointTooltip} from "./CurrentPointTooltip/CurrentPointTooltip";
import ChartLegend from "./ChartLegend/ChartLegend";

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
  } = useZoomableLineChart(props);

  const [currentPoint, setCurrentPoint] = useState(null);

  // console.log(currentPoint);
  // {"values":[44,4,60],"date":"2024-05-05 19:33"}

  useEffect(() => {
    if (!svg) return;

    const brush = createBrush();
    const {xScale, yScale} = scale;
    const {xAxis} = createAxes(xScale, yScale);
    addClipping();

    const {focus, focusText} = createCursor();

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
      const point = handleMoveCursor(
        event,
        dataArray,
        xScale,
        yScale,
        focus,
        focusText
      );
      setCurrentPoint(point);
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

  return (
    <>
      <CurrentPointTooltip currentPoint={currentPoint} colors={colors}>
        <div ref={ref}></div>
      </CurrentPointTooltip>
      <ChartLegend colors={colors} labels={labels} />
    </>
  );
};

export default ZoomableLineChart;
