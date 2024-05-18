import BasicBarChart from "../components/BasicBarChart/BasicBarChart";

export const BasicBarChartView = () => {
  const DATA = [
    { name: "United States", value: 12394 },
    { name: "Russia", value: 6148 },
    { name: "Germany (FRG)", value: 1653 },
    { name: "France", value: 2162 },
    { name: "United Kingdom", value: 1214 },
    { name: "China", value: 1131 },
    { name: "Spain", value: 814 },
    { name: "Netherlands", value: 1167 },
    { name: "Italy", value: 660 },
    { name: "Israel", value: 1263 },
  ];
  return (
    <>
      <BasicBarChart data={DATA} />
    </>
  );
};
