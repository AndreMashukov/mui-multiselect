/* eslint-disable import/no-unresolved */
import React from "react";
import LineChartWithSelector from "./LineChartWithSelector";
import useLineChartWithSelector from "./useLineChartWithSelector";
import ReadMe from "./LineChartWithSelector.md?raw";

export default {
  title: "Components/Charts/LineChart/LineChartDemo",
  component: LineChartWithSelector,
  parameters: {
    docs: {
      description: {
        component: ReadMe,
      },
    },
  },
};

const COLORS = ["black", "green", "blue"];
const LABELS = ["Line 1", "Line 2", "Line 3"];

function LineChartTemplate(args, type, thresholds = []) {
  const {form, timeScaleStep, data, handleTimeScaleChange, filterByDateRange} =
    useLineChartWithSelector();

  return (
    <LineChartWithSelector
      {...args}
      form={form}
      timeScaleStep={timeScaleStep}
      data={data.map(filterByDateRange)}
      handleTimeScaleChange={handleTimeScaleChange}
      colors={COLORS}
      labels={LABELS}
      type={type}
      thresholds={thresholds}
    />
  );
}

function UsingZoomableLineChartTemplate(args) {
  return LineChartTemplate(args, "basic");
}

export const UsingZoomableLineChart = UsingZoomableLineChartTemplate.bind({});

function UsingLineChartThresholdSegmentTemplate(args) {
  return LineChartTemplate(args, "segment", [
    {value: 30, color: "orange", description: "Orange Threshold"},
    {value: 50, color: "red", description: "Red Threshold"},
  ]);
}

export const UsingLineChartThresholdSegment =
  UsingLineChartThresholdSegmentTemplate.bind({});

function UsingLineChartThresholdSegmentNoThresholdTemplate(args) {
  return LineChartTemplate(args, "segment", []);
}
export const UsingLineChartThresholdSegmentNoThreshold =
  UsingLineChartThresholdSegmentNoThresholdTemplate.bind({});

function UsingLineChartThresholdAreaTemplate(args) {
  return LineChartTemplate(args, "area", [
    {value: 30, color: "orange", description: "Orange Threshold"},
    {value: 50, color: "red", description: "Red Threshold"},
  ]);
}

export const UsingLineChartThresholdArea =
  UsingLineChartThresholdAreaTemplate.bind({});
