import * as d3 from "d3";

export const createBrush = (_width, _height) => {
  return d3.brushX().extent([
    [0, 0],
    [_width, _height],
  ]);
};
