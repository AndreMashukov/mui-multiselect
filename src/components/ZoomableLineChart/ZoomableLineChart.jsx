/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useZoomableLineChart } from "./useZoomableLineChart";

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

  const [currentPoint, setCurrentPoint] = useState(null);

  // console.log(currentPoint);
  // {
  //   "line1": {
  //       "value": 59
  //   },
  //   "date": "2024-05-06",
  //   "line2": {
  //       "value": 52
  //   },
  //   "line3": {
  //       "value": 62
  //   }
  // }

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

      linesArray.push(line);
      dotsArray.push(dots);
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

  return <div ref={ref}></div>;
};

export default ZoomableLineChart;

// focusText
// .html(
//   selectedDataArray
//     .map(
//       (selectedData) =>
//         "x:" +
//         moment(selectedData.date).format("DD/MM/YYYY HH:mm") +
//         "  -  " +
//         "y:" +
//         selectedData.value
//     )
//     .join("<br>")
// )