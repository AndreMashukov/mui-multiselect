import { Typography } from "@mui/material";
import SankeyDiagram from "../components/SankeyDiagram/SankeyDiagram";

function generateSankeyData() {
  const nodes = Array.from({ length: 51 }, (_, i) => ({
    id: i,
    name: `node${i}`,
  }));

  const links = [
    { source: 0, target: 2, value: 2 },
    { source: 1, target: 2, value: 2 },
    { source: 1, target: 3, value: 2 },
    { source: 0, target: 4, value: 2 },
    { source: 2, target: 3, value: 2 },
    { source: 2, target: 4, value: 2 },
    { source: 3, target: 4, value: 4 },
    { source: 5, target: 6, value: 3 },
    { source: 5, target: 7, value: 3 },
    { source: 6, target: 8, value: 3 },
    { source: 7, target: 8, value: 3 },
    { source: 8, target: 9, value: 6 },
    { source: 0, target: 9, value: 2 },
    { source: 10, target: 7, value: 2 },
    { source: 11, target: 7, value: 2 },
    { source: 12, target: 7, value: 2 },
    { source: 13, target: 7, value: 2 },
    { source: 14, target: 7, value: 2 },
    { source: 15, target: 7, value: 2 },
    { source: 16, target: 7, value: 2 },
    { source: 17, target: 7, value: 2 },
    { source: 18, target: 7, value: 2 },
    { source: 19, target: 7, value: 2 },
    { source: 20, target: 7, value: 2 },
    { source: 21, target: 7, value: 2 },
    { source: 22, target: 7, value: 2 },
    { source: 23, target: 7, value: 2 },
    { source: 24, target: 7, value: 2 },
    { source: 25, target: 7, value: 2 },
    { source: 26, target: 7, value: 2 },
    { source: 27, target: 7, value: 2 },
    { source: 28, target: 7, value: 2 },
    { source: 29, target: 7, value: 2 },
    { source: 30, target: 7, value: 2 },
    { source: 31, target: 7, value: 2 },
    { source: 32, target: 7, value: 2 },
    { source: 33, target: 7, value: 2 },
    { source: 34, target: 7, value: 2 },
    { source: 35, target: 7, value: 2 },
    { source: 36, target: 7, value: 2 },
    { source: 37, target: 7, value: 2 },
    { source: 38, target: 7, value: 2 },
    { source: 39, target: 7, value: 2 },
    { source: 40, target: 7, value: 2 },
    { source: 41, target: 7, value: 2 },
    { source: 42, target: 7, value: 2 },
    { source: 43, target: 7, value: 2 },
    { source: 44, target: 7, value: 2 },
    { source: 45, target: 7, value: 2 },
    { source: 46, target: 7, value: 2 },
    { source: 47, target: 7, value: 2 },
    { source: 48, target: 7, value: 2 },
    { source: 49, target: 7, value: 2 },
    { source: 50, target: 7, value: 2 },
    { source: 7, target: 9, value: 2 },
    { source: 7, target: 9, value: 2 },
    { source: 7, target: 9, value: 2 },
    { source: 7, target: 9, value: 2 },
    { source: 7, target: 9, value: 2 },
    { source: 7, target: 4, value: 2 },
    { source: 7, target: 4, value: 2 },
    { source: 7, target: 4, value: 2 },
    { source: 7, target: 4, value: 2 },
    { source: 7, target: 4, value: 2 },
    { source: 7, target: 4, value: 2 },
  ];

  return { nodes, links };
}

const sankeyData = generateSankeyData();

export const SankeyDiagramView = () => {
  return (
    <div style={{ padding: "20px"}}>
      <Typography variant="h4">Sankey Diagram</Typography>
      <SankeyDiagram sankeyData={sankeyData} width={600} height={600} />
    </div>
  );
};
