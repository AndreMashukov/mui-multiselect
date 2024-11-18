import * as Plot from "@observablehq/plot";
import React, {useCallback} from "react";
import PropTypes from "prop-types";
import processData from "../shared/utils/processData";
import getTitle from "../shared/utils/getTitle";
import LineChartThresholdCommon from "../shared/LineChartThresholdCommon/LineChartThresholdCommon";

const WIDTH = 800;
const HEIGHT = 400;

// thresholds: [
//   {value: 29, color: "green", description: "Green Threshold"},
//   {value: 41, color: "red", description: "Red Threshold"},
// ],

const LineChartThresholdArea = ({
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

      dataArray.forEach((data, index) => {
        // Plot line that includes all data points (will have gaps where data is missing)
        marks.push(
          Plot.line(data, {
            x: "date",
            y: "value",
            stroke: colors[index],
            strokeWidth: 2,
            title: (d) => getTitle(d, colors[index]),
          })
        );

        // Plot line connecting non-missing data points
        marks.push(
          Plot.line(
            data.filter((d) => d.value !== null && !Number.isNaN(d.value)),
            {
              x: "date",
              y: "value",
              stroke: colors[index],
              strokeWidth: 2,
              strokeDasharray: "4 4",
              title: (d) => getTitle(d, colors[index]),
            }
          )
        );

        // Add dots for each data point
        marks.push(
          Plot.dot(
            data.filter((d) => d.value !== null && !Number.isNaN(d.value)),
            {
              x: "date",
              y: "value",
              fill: colors[index],
              r: 2,
              title: (d) => getTitle(d, colors[index]),
            }
          )
        );

        // Add area above threshold
        if (thresholds !== undefined) {
          const dataCopy = processData(data, thresholds);

          thresholds.forEach((threshold) => {
            marks.push(
              Plot.areaY(
                dataCopy.filter((d) => d.value >= threshold.value),
                {
                  x: "date",
                  y1: threshold.value,
                  y2: "value",
                  fill: threshold.color,
                  opacity: 0.4,
                }
              )
            );
          });
        }

        const pointerX = Plot.dot(
          dataArray[index],
          Plot.pointerX({
            x: "date",
            y: "value",
            stroke: colors[index],
            r: 8,
            title: (d) => getTitle(d, colors[index]),
          })
        );

        marks.push(pointerX);
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

LineChartThresholdArea.propTypes = {
  dataArray: PropTypes.array.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  colors: PropTypes.array.isRequired,
  labels: PropTypes.array.isRequired,
  thresholds: PropTypes.array,
};

export default LineChartThresholdArea;
