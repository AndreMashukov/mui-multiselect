import { useLayoutEffect, useRef, useState } from "react";
import * as d3 from "d3";
import utils from "./utils";

export const useZoomableLineChart = (props) => {
  const { _width, _height, margin, dataArray } = props;
  const ref = useRef();
  const [svg, setSvg] = useState(null);
  const [currentZoomState, setCurrentZoomState] = useState(d3.zoomIdentity);
  const [scale, setScale] = useState({});

  const dimensions = { width: _width, height: _height };

  useLayoutEffect(() => {
    d3.select(ref.current).selectAll("*").remove();
    setSvg(createSvg(ref));
    const newScale = utils.createScale(dataArray, dimensions, currentZoomState);
    setScale(newScale);
  }, [_width, _height, dataArray]);

  let idleTimeout;
  function idled() {
    idleTimeout = null;
  }

  const createSvg = (ref) => utils.createSvg(ref, _width, _height, margin);
  const createAxes = (xScale, yScale) =>
    utils.createAxes({ svg, xScale, yScale, dimensions });
  const addClipping = () => utils.addClipping(svg, _width, _height);
  const createLine = (data, x, y, color) =>
    utils.createLine(svg, data, x, y, color);
  const addDots = (data, x, y) => utils.addDots(svg, data, x, y);
  const updateDots = (dots, x, y) => utils.updateDots(dots, x, y);
  const createBrush = () => utils.createBrush(_width, _height);
  const updateChart = (event, x, y, xAxis, lines, brush, dots) =>
    utils.updateChart(
      event,
      x,
      y,
      xAxis,
      lines,
      brush,
      dots,
      idleTimeout,
      idled
    );
  const handleChartDoubleClick = (dataArray, x, y, xAxis, lines, dots) =>
    utils.handleChartDoubleClick(dataArray, x, y, xAxis, lines, dots);
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
    setCurrentZoomState,
    scale,
  };
};
