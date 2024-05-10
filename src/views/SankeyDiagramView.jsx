import { Typography } from "@mui/material";
import SankeyDiagram from "../components/SankeyDiagram/SankeyDiagram";


function generateSankeyData() {
  const nodes = Array.from({ length: 21 }, (_, i) => ({
    id: i,
    name: `node${i}`
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
    { source: 7, target: 9, value: 2 },
    { source: 7, target: 9, value: 2 },
    { source: 7, target: 9, value: 2 },
    { source: 7, target: 9, value: 2 },
    { source: 7, target: 9, value: 2 },
    { source: 7, target: 9, value: 2 },
    { source: 7, target: 9, value: 2 },
    { source: 7, target: 9, value: 2 },
    { source: 7, target: 9, value: 2 },
    { source: 7, target: 9, value: 2 },
    { source: 7, target: 9, value: 2 },
  ];

  return { nodes, links };
}

// Usage:
const sankeyData = generateSankeyData();

// function generateSankeyData(numNodes, numLinks) {
//   const nodes = Array.from({ length: numNodes }, (_, i) => ({
//     id: i,
//     name: `node${i}`
//   }));

//   const links = Array.from({ length: numLinks }, () => ({
//     source: Math.floor(Math.random() * numNodes),
//     target: Math.floor(Math.random() * numNodes),
//     value: Math.floor(Math.random() * 10) + 1
//   }));

//   return { nodes, links };
// }

// const sankeyData = generateSankeyData(2, 4);

console.log(sankeyData)

export const SankeyDiagramView = () => {
  return (
    <div style={{ padding: "20px", width: 800 }}>
      <Typography variant="h4">Sankey Diagram</Typography>
      <SankeyDiagram sankeyData={sankeyData} />
    </div>
  );
};
