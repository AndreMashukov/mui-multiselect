import { useState } from "react";
import StackedBarChart from "../components/StackedBarChart/StackedBarChart";
import BasicBarChart from "../components/BasicBarChart/BasicBarChart";

const data = [
  {
    group: "banana",
    Nitrogen: "12",
    normal: "1",
    stress: "13",
  },
  {
    group: "poacee",
    Nitrogen: "6",
    normal: "6",
    stress: "33",
  },
  {
    group: "sorgho",
    Nitrogen: "11",
    normal: "28",
    stress: "12",
  },
  {
    group: "triticum",
    Nitrogen: "19",
    normal: "6",
    stress: "1",
  },
];

data.columns = ["group", "Nitrogen", "normal", "stress"];

export const StackedBarChartView = () => {
  const [selectedData, setSelectedData] = useState();
  return (
    <>
      {!selectedData && (
        <StackedBarChart data={data} setSelectedData={setSelectedData} />
      )}
      {selectedData && <BasicBarChart data={selectedData.data} />}
    </>
  );
};
