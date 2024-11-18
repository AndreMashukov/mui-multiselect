The `ZoomableLineChart` component is a React component that displays a zoomable and interactive line chart. It provides functionalities such as zooming, panning, tooltips, and displaying multiple data series.

The `ZoomableLineChart` component uses D3.js for rendering the chart and managing interactions.

### Usage

To use the `ZoomableLineChart` component, simply import it and include it in your JSX:

```jsx
import React from "react";
import ZoomableLineChart from "./ZoomableLineChart";

// Sample data
const dataArray = [
  [
    {date: new Date("2024-02-29T20:30:22+08:00"), value: 10},
    {date: new Date("2024-03-01T20:30:22+08:00"), value: 20},
    {date: new Date("2024-03-02T20:30:22+08:00"), value: 30},
  ],
  [
    {date: new Date("2024-02-29T20:30:22+08:00"), value: 15},
    {date: new Date("2024-03-01T20:30:22+08:00"), value: 25},
    {date: new Date("2024-03-02T20:30:22+08:00"), value: 35},
  ],
];

const colors = ["#ff0000", "#00ff00"];
const labels = ["Series 1", "Series 2"];

function App() {
  return (
    <ZoomableLineChart
      dataArray={dataArray}
      width={800}
      height={400}
      colors={colors}
      labels={labels}
    />
  );
}
```

| Prop | Type | Description | 
|---------|---------|
| __dataArray__   | array |  Array of data points  |
| __width__   | number | Width of the chart |
| __height__   | number | Height of the chart |
| __colors__   | array | Array of colors for each data series |
| __labels__   | array | Array of labels for each data series |
