/* eslint-disable no-restricted-syntax */
import * as Plot from "@observablehq/plot";
import React, {useCallback} from "react";
import PropTypes from "prop-types";
import processData from "../shared/utils/processData";
import segmentData from "../shared/utils/segmentData";
import createMissingValueDots from "../shared/utils/addDotsFormissingValues";
import getTitle from "../shared/utils/getTitle";
import LineChartThresholdCommon from "../shared/LineChartThresholdCommon/LineChartThresholdCommon";
import {getSegmentColor} from "../shared/utils/getSegmentColor";

const WIDTH = 800;
const HEIGHT = 400;

const LineChartThresholdSegment = ({
  dataArray,
  width,
  height,
  colors,
  labels,
  thresholds = [],
}) => {
  const widthLocal = width || WIDTH;
  const heightLocal = height || HEIGHT;

  const createPlot = useCallback(
    (xDomain) => {
      const marks = [];
      thresholds.sort((a, b) => b.value - a.value);

      dataArray.forEach((data, i) => {
        const processedData = processData(data, thresholds);
        const segments = segmentData(processedData, thresholds);

        const dots = Plot.dot(dataArray[i], {
          x: "date",
          y: "value",
          fill: colors[i],
          r: 2,
          symbol: "circle",
          title: (d) => getTitle(d, colors[i]),
        });
        marks.push(dots);

        for (const segment of segments) {
          const line = Plot.line(segment, {
            x: "date",
            y: "value",
            stroke: getSegmentColor(segment, thresholds) || colors[i],
          });
          marks.push(line);
          const [missingValuesCircles, missingValuesCrosses] =
            createMissingValueDots(segment, data, colors[i]);
          marks.push(missingValuesCircles, missingValuesCrosses);

          const pointerX = Plot.dot(
            dataArray[i],
            Plot.pointerX({
              x: "date",
              y: "value",
              stroke: colors[i],
              r: 8,
              title: (d) => getTitle(d, colors[i]),
            })
          );

          marks.push(pointerX);
        }
      });

      if (thresholds !== undefined) {
        thresholds.forEach((threshold) => {
          marks.push(
            Plot.ruleY([threshold.value], {
              stroke: threshold.color,
              strokeWidth: 1.5,
              strokeDasharray: "4 4",
            })
          );
        });
      }

      return Plot.plot({
        width: widthLocal,
        height: heightLocal,
        marks,
        x: {
          type: "time",
          domain: xDomain,
          label: "Date",
        },
        y: {
          label: "Value",
          grid: true,
        },
        color: {
          legend: true,
        },
        clip: true,
        inset: 20,
      });
    },
    [dataArray, colors, thresholds, widthLocal, heightLocal]
  );

  return (
    <LineChartThresholdCommon
      createPlot={createPlot}
      dataArray={dataArray}
      width={width}
      height={height}
      colors={colors}
      labels={labels}
      thresholds={thresholds}
    />
  );
};

LineChartThresholdSegment.propTypes = {
  dataArray: PropTypes.array.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  colors: PropTypes.array.isRequired,
  labels: PropTypes.array.isRequired,
  thresholds: PropTypes.array,
};

export default LineChartThresholdSegment;
