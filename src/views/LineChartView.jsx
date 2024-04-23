import { useState } from "react";
import LineChart from "../components/LineChart/LineChart";
import moment from "moment";

const LineChartView = () => {
  const [data, setData] = useState([
    { date: "1 Jan 2000", value: 100 },
    { date: "1 Feb 2000", value: 120 },
    { date: "1 Mar 2000", value: 140 },
    { date: "1 Apr 2000", value: 130 },
    { date: "1 May 2000", value: 150 },
    { date: "1 Jun 2000", value: 160 },
    { date: "1 Jul 2000", value: 170 },
    { date: "1 Aug 2000", value: 180 },
    { date: "1 Sep 2000", value: 190 },
    { date: "1 Oct 2000", value: 200 },
    { date: "1 Nov 2000", value: 210 },
    { date: "1 Dec 2000", value: 220 },
  ]);

  const mapData = (data) => {
    return data.map((d) => {
      return {
        date: moment(d.date).toDate(),
        value: d.value,
      };
    });
  };

  return <LineChart data={mapData(data)} />;
};

export default LineChartView;
