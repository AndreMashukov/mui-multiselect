/* eslint-disable react/prop-types */
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { useZoomableLineChart } from "./useZoomableLineChart";

const WIDTH = 800;
const HEIGHT = 400;

const ZoomableLineChart = ({ data, width, height }) => {
  const ref = useRef();
  const [svg, setSvg] = useState(null);
  const margin = { top: 10, right: 30, bottom: 30, left: 60 };
  const _width = (width || WIDTH) - margin.left - margin.right;
  const _height = (height || HEIGHT) - margin.top - margin.bottom;

  const props = {
    data,
    _width,
    _height,
    margin,
  };

  const {
    createSvg,
    createAxes,
    addClipping,
    createLine,
    addDots,
    createBrush,
    updateChart,
    handleChartDoubleClick,
    createCursor,
    handleMoveCursor,
  } = useZoomableLineChart(svg, props);

  useLayoutEffect(() => {
    if (!data || !data.length) return;
    d3.select(ref.current).selectAll("*").remove();
    setSvg(createSvg(ref));
  }, [_width, _height, data]);

  useEffect(() => {
    if (!svg) return;

    const { x, y, xAxis } = createAxes();
    addClipping();

    const line = createLine(x, y);
    const brush = createBrush();
    const dots = addDots(x, y);

    brush.on("end", (event) =>
      updateChart(event, x, y, xAxis, line, brush, dots)
    );
    line.append("g").attr("class", "brush").call(brush);

    svg.on("dblclick", () =>
      handleChartDoubleClick(x, y, xAxis, line, dots)
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
        handleMoveCursor(event, x, y, focus, focusText)
      )
      .on("mouseout", function () {
        focus.style("opacity", 0);
        focusText.style("opacity", 0);
      });
  }, [svg]);

  return <div ref={ref}></div>;
};

export default ZoomableLineChart;
