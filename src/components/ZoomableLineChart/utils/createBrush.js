import * as d3 from "d3";

export const createBrush = (widthLocal, heightLocal) => {
  return d3.brushX().extent([
    [0, 0],
    [widthLocal, heightLocal],
  ]);
};
