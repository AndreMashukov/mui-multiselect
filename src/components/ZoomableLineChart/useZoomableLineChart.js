import { useLayoutEffect, useRef, useState } from "react";
import * as d3 from "d3";
import utils from "./utils";

export const useZoomableLineChart = (props) => {
  const { _width, _height, margin, dataArray } = props;
  const ref = useRef();
  const [svg, setSvg] = useState(null);

  useLayoutEffect(() => {
    // if (!data || !data.length) return;
    d3.select(ref.current).selectAll("*").remove();
    setSvg(createSvg(ref));
  }, [_width, _height, dataArray]);

  let idleTimeout;
  function idled() {
    idleTimeout = null;
  }

  const createSvg = (ref) => utils.createSvg(ref, _width, _height, margin);
  const createAxes = (data) => utils.createAxes(svg, data, _width, _height);
  const addClipping = () => utils.addClipping(svg, _width, _height);
  const createLine = (data, x, y, color) => utils.createLine(svg, data, x, y, color);
  const addDots = (data, x, y) => utils.addDots(svg, data, x, y);
  const updateDots = (dots, x, y) => utils.updateDots(dots, x, y);
  const createBrush = () => utils.createBrush(_width, _height);
  const updateChart = (event, x, y, xAxis, line, brush, dots) =>
    utils.updateChart(
      event,
      x,
      y,
      xAxis,
      line,
      brush,
      dots,
      idleTimeout,
      idled
    );
  const handleChartDoubleClick = (data, x, y, xAxis, line, dots) =>
    utils.handleChartDoubleClick(data, x, y, xAxis, line, dots);
  const createCursor = () => utils.createCursor(svg);
  const handleMoveCursor = (event, data, x, y, focus, focusText) =>
    utils.handleMoveCursor(event, data, x, y, focus, focusText);

  return {
    ref,
    svg,
    createSvg,
    createAxes,
    addClipping,
    createLine,
    addDots,
    updateDots,
    createBrush,
    updateChart,
    handleChartDoubleClick,
    createCursor,
    handleMoveCursor,
  };
};
