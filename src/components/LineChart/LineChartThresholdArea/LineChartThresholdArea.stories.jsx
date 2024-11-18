/* eslint-disable import/no-unresolved */
import React from "react";
import LineChartThresholdArea from "./LineChartThresholdArea";
import ReadMe from "./LineChartThresholdArea.md?raw";

// Sample data
const dataArray = [
  [
    {date: new Date("2024-02-29T20:30:22+08:00"), value: 10},
    {date: new Date("2024-03-01T20:30:22+08:00"), value: 20},
    {date: new Date("2024-03-02T20:30:22+08:00"), value: 30},
    {date: new Date("2024-03-03T20:30:22+08:00"), value: 25},
    {date: new Date("2024-03-04T20:30:22+08:00"), value: 35},
    {date: new Date("2024-03-05T20:30:22+08:00"), value: 50},
    {date: new Date("2024-03-06T20:30:22+08:00"), value: 45},
    {date: new Date("2024-03-07T20:30:22+08:00"), value: 30},
    {date: new Date("2024-03-08T20:30:22+08:00"), value: 28},
    {date: new Date("2024-03-09T20:30:22+08:00"), value: 27},
  ],
  [
    {date: new Date("2024-02-29T20:30:22+08:00"), value: 15},
    {date: new Date("2024-03-01T20:30:22+08:00"), value: 25},
    {date: new Date("2024-03-02T20:30:22+08:00"), value: 35},
    {date: new Date("2024-03-03T20:30:22+08:00"), value: 30},
    {date: new Date("2024-03-04T20:30:22+08:00"), value: 40},
    {date: new Date("2024-03-05T20:30:22+08:00"), value: 45},
    {date: new Date("2024-03-06T20:30:22+08:00"), value: 50},
    {date: new Date("2024-03-07T20:30:22+08:00"), value: 55},
    {date: new Date("2024-03-08T20:30:22+08:00"), value: 60},
    {date: new Date("2024-03-09T20:30:22+08:00"), value: 65},
  ],
];

const dataArrayWithMissingValues = [
  [
    {date: new Date("2024-02-29T20:30:22+08:00"), value: 10},
    {date: new Date("2024-03-01T20:30:22+08:00"), value: 20},
    {date: new Date("2024-03-02T20:30:22+08:00"), value: 30},
    {date: new Date("2024-03-03T20:30:22+08:00"), value: NaN},
    {date: new Date("2024-03-04T20:30:22+08:00"), value: NaN},
    {date: new Date("2024-03-05T20:30:22+08:00"), value: 60},
    {date: new Date("2024-03-06T20:30:22+08:00"), value: 45},
    {date: new Date("2024-03-07T20:30:22+08:00"), value: 30},
    {date: new Date("2024-03-08T20:30:22+08:00"), value: 28},
    {date: new Date("2024-03-09T20:30:22+08:00"), value: 27},
  ],
  [
    {date: new Date("2024-02-29T20:30:22+08:00"), value: 15},
    {date: new Date("2024-03-01T20:30:22+08:00"), value: 20},
    {date: new Date("2024-03-02T20:30:22+08:00"), value: NaN},
    {date: new Date("2024-03-03T20:30:22+08:00"), value: 30},
    {date: new Date("2024-03-04T20:30:22+08:00"), value: 40},
    {date: new Date("2024-03-05T20:30:22+08:00"), value: 45},
    {date: new Date("2024-03-06T20:30:22+08:00"), value: 50},
    {date: new Date("2024-03-07T20:30:22+08:00"), value: 55},
    {date: new Date("2024-03-08T20:30:22+08:00"), value: 60},
    {date: new Date("2024-03-09T20:30:22+08:00"), value: 65},
  ],
];
const colors = ["steelblue", "black"];
const labels = ["Series 1", "Series 2"];

export default {
  title: "Components/Charts/LineChart/LineChartThresholdArea",
  component: LineChartThresholdArea,
  parameters: {
    docs: {
      description: {
        component: ReadMe,
      },
    },
  },
};

const Template = (args) => <LineChartThresholdArea {...args} />;

export const Default = Template.bind({});

Default.args = {
  dataArray,
  width: 800,
  height: 400,
  colors,
  labels,
};

export const CustomSize = Template.bind({});

CustomSize.args = {
  dataArray,
  width: 600,
  height: 300,
  colors,
  labels,
};

export const WithThreshold = Template.bind({});

WithThreshold.args = {
  dataArray,
  width: 800,
  height: 400,
  colors,
  labels,
  thresholds: [{value: 33, color: "red", description: "Red Threshold"}],
};

export const MissingValues = Template.bind({});

MissingValues.args = {
  dataArray: dataArrayWithMissingValues,
  width: 800,
  height: 400,
  colors,
  labels,
};

export const MissingValuesWithThreshold30 = Template.bind({});

MissingValuesWithThreshold30.args = {
  dataArray: dataArrayWithMissingValues,
  width: 800,
  height: 400,
  colors,
  labels,
  thresholds: [{value: 30, color: "red", description: "Red Threshold"}],
};

export const MissingValuesWithThreshold22 = Template.bind({});

MissingValuesWithThreshold22.args = {
  dataArray: dataArrayWithMissingValues,
  width: 800,
  height: 400,
  colors,
  labels,
  thresholds: [{value: 22, color: "red", description: "Red Threshold"}],
};

export const MissingValuesWithThreshold33 = Template.bind({});

MissingValuesWithThreshold33.args = {
  dataArray: dataArrayWithMissingValues,
  width: 800,
  height: 400,
  colors,
  labels,
  thresholds: [
    {value: 33, color: "red", description: "Red Threshold"},
    {value: 50, color: "green", description: "Green Threshold"},
  ],
};
