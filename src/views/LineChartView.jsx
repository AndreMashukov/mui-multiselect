import { useState } from "react";
import LineChart from "../components/LineChart/LineChart";

const LineChartView = () => {
  const [data, setData] = useState([
    { date: "1 Jan 2000", value: 100 },
    { date: "1 Feb 2000", value: 120 },
    { date: "1 Mar 2000", value: 140 },
    { date: "1 Apr 2000", value: 130 },
    { date: "1 May 2000", value: 150 },
  ]);

  return <LineChart data={data} />;
};

export default LineChartView;
