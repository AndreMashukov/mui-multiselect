import utils from "./utils";

export const useZoomableLineChart = (svg, props) => {
  const { data, _width, _height, margin } = props;

  const createSvg = (ref) => utils.createSvg(ref, _width, _height, margin);
  const createAxes = () => utils.createAxes(svg, data, _width, _height);
  const addClipping = () => utils.addClipping(svg, _width, _height);
  const createLine = (x, y) => utils.createLine(svg, data, x, y);
  const addDots = (x, y) => utils.addDots(svg, data, x, y);
  const updateDots = (dots, x, y) => utils.updateDots(dots, x, y);
  const createBrush = () => utils.createBrush(_width, _height);

  return {
    createSvg,
    createAxes,
    addClipping,
    createLine,
    addDots,
    updateDots,
    createBrush
  };
};
