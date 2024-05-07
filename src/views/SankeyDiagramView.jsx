import { Typography } from "@mui/material";
import SankeyDiagram from "../components/SankeyDiagram/SankeyDiagram";

const sankeyData = {
  nodes: [
    { id: 0, name: "node0" },
    { id: 1, name: "node1" },
    { id: 2, name: "node2" },
    { id: 3, name: "node3" },
    { id: 4, name: "node4" },
  ],
  links: [
    { source: 0, target: 2, value: 2 },
    { source: 1, target: 2, value: 2 },
    { source: 1, target: 3, value: 2 },
    { source: 0, target: 4, value: 2 },
    { source: 2, target: 3, value: 2 },
    { source: 2, target: 4, value: 2 },
    { source: 3, target: 4, value: 4 },
  ],
};

export const SankeyDiagramView = () => {
  return (
    <div style={{ padding: "20px", width: 800 }}>
      <Typography variant="h4">Sankey Diagram</Typography>
      <SankeyDiagram sankeyData={sankeyData} />
    </div>
  );
}