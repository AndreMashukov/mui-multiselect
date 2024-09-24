import DoughnutChartCard from "../components/DoughnutChartCard/DoughnutChartCard";

// Default.args = {
//   graphData: {
//     types: [
//       {title: "Type 1"},
//       {title: "Type 2"},
//       {title: "Type 3"},
//       {title: "Type 4"},
//       {title: "Type 5"},
//       {title: "Type 6"},
//     ],
//     graph: [10, 20, 30, 40, 50, 60],
//     totalNumber: 230,
//   },
//   title: "Chart",
//   onClick: () => alert("Card clicked!"),
// };

export const DoughnutChartCardView = () => {
  return (
    <DoughnutChartCard
      graphData={{
        types: [
          { title: "Type 1" },
          { title: "Type 2" },
          { title: "Type 3" },
          { title: "Type 4" },
          { title: "Type 5" },
          { title: "Type 6" },
        ],
        graph: [10, 20, 30, 40, 50, 60],
        totalNumber: 230,
      }}
      title="Chart"
      onClick={() => alert("Card clicked!")}
    />
  );
};

