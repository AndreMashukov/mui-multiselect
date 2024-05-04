import utils from "./utils";

export const useZoomableLineChart = (svg, props) => {
  const { data, _width, _height, margin } = props;

  let idleTimeout;
  function idled() {
    idleTimeout = null;
  }

  const createSvg = (ref) => utils.createSvg(ref, _width, _height, margin);
  const createAxes = () => utils.createAxes(svg, data, _width, _height);
  const addClipping = () => utils.addClipping(svg, _width, _height);
  const createLine = (x, y) => utils.createLine(svg, data, x, y);
  const addDots = (x, y) => utils.addDots(svg, data, x, y);
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
  const handleChartDoubleClick = (x, y, xAxis, line, dots) =>
    utils.handleChartDoubleClick(data, x, y, xAxis, line, dots);
  const createCursor = () => utils.createCursor(svg);
  const handleMoveCursor = (event, x, y, focus, focusText) =>
    utils.handleMoveCursor(event, data, x, y, focus, focusText);

  return {
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
