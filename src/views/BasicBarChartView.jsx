import BasicBarChart from "../components/BasicBarChart/BasicBarChart";

export const BasicBarChartView = () => {
  const DATA = [
    { Country: "United States", Value: 12394 },
    { Country: "Russia", Value: 6148 },
    { Country: "Germany (FRG)", Value: 1653 },
    { Country: "France", Value: 2162 },
    { Country: "United Kingdom", Value: 1214 },
    { Country: "China", Value: 1131 },
    { Country: "Spain", Value: 814 },
    { Country: "Netherlands", Value: 1167 },
    { Country: "Italy", Value: 660 },
    { Country: "Israel", Value: 1263 },
  ];
  return (
    <>
      <BasicBarChart data={DATA} />
    </>
  );
};
