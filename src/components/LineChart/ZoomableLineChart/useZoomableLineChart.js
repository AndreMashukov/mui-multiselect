/* eslint-disable import/prefer-default-export */
import {useLayoutEffect, useRef, useState} from "react";
import * as d3 from "d3";
import utils from "./utils";

export const useZoomableLineChart = (props) => {
  const {widthLocal, heightLocal, margin, dataArray} = props;
  const ref = useRef();
  const [svg, setSvg] = useState(null);
  const [currentZoomState, setCurrentZoomState] = useState(d3.zoomIdentity);
  const [scale, setScale] = useState({});

  const dimensions = {width: widthLocal, height: heightLocal};

  const createSvg = (refParam) =>
    utils.createSvg(refParam, widthLocal, heightLocal, margin);

  useLayoutEffect(() => {
    d3.select(ref.current).selectAll("*").remove();
    setSvg(createSvg(ref));
    const newScale = utils.createScale(dataArray, dimensions, currentZoomState);
    setScale(newScale);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [widthLocal, heightLocal, dataArray]);

  let idleTimeout;
  function idled() {
    idleTimeout = null;
  }

  const createAxes = (xScale, yScale) =>
    utils.createAxes({svg, xScale, yScale, dimensions});
  const addClipping = () => utils.addClipping(svg, widthLocal, heightLocal);
  const createLine = (data, x, y, color) =>
    utils.createLine(svg, data, x, y, color);
  const addDots = (data, x, y) => utils.addDots(svg, data, x, y);
  const updateDots = (dots, x, y) => utils.updateDots(dots, x, y);
  const createBrush = () => utils.createBrush(widthLocal, heightLocal);
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
  const handleChartDoubleClick = (dataArrayParam, x, y, xAxis, lines, dots) =>
    utils.handleChartDoubleClick(dataArrayParam, x, y, xAxis, lines, dots);
  const createCursor = () => utils.createCursor(svg, heightLocal);
  const handleMoveCursor = (
    event,
    data,
    x,
    y,
    focus,
    focusText,
    tooltip,
    colors
  ) =>
    utils.handleMoveCursor(
      event,
      data,
      x,
      y,
      focus,
      focusText,
      tooltip,
      colors
    );

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
    createTooltip: utils.createTooltip,
  };
};
