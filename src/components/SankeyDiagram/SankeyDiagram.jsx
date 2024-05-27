import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { sankey, sankeyLinkHorizontal, sankeyCenter } from "d3-sankey";
import { CurrentPointTooltip } from "./CurrentPointTooltip/CurrentPointTooltip";

// Function to generate random colors
function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

const SankeyDiagram = ({ sankeyData, width, height }) => {
  const svgRef = useRef();
  // const gRef = useRef(); // Add a new ref for the group element

  const [currentPoint, setCurrentPoint] = useState(null);
  const zoom = d3.zoom().scaleExtent([1, 3]); // Def

  const drawNodes = (svg, nodes) => {
    svg
      .append("g")
      .selectAll("rect")
      .data(nodes)
      .join("rect")
      .attr("x", (d) => d.x0)
      .attr("y", (d) => d.y0)
      .attr("height", (d) => d.y1 - d.y0)
      .attr("width", (d) => d.x1 - d.x0)
      .attr("fill", (d) => (d.depth == 1 ? "#FF7A00" : getRandomColor()));
  };

  const addLabels = (svg, nodes, width) => {
    svg
      .append("g")
      .style("font", "10px sans-serif")
      .selectAll("text")
      .data(nodes)
      .join("text")
      .attr("x", (d) => (d.x0 < width / 2 ? d.x1 + 6 : d.x0 - 6))
      .attr("y", (d) => (d.y1 + d.y0) / 2)
      .attr("dy", "0.35em")
      .attr("text-anchor", (d) => (d.x0 < width / 2 ? "start" : "end"))
      .text((d) => d.name);
  };

  const drawLinks = (svg, links) => {
    svg
      .append("g")
      .attr("fill", "none")
      .attr("stroke", "#D7D7D7")
      .attr("stroke-opacity", 0.5)
      .selectAll("g")
      .data(links)
      .join("path")
      .attr("d", sankeyLinkHorizontal())
      .attr("stroke-width", (d) => Math.max(1, d.width))
      .on("mouseover", function (event, d) {
        d3.select(this).attr("stroke", "#A6A6A6");
        setCurrentPoint({
          source: d.source.name,
          target: d.target.name,
          value: d.value,
        });
      })
      .on("mouseout", function () {
        d3.select(this).attr("stroke", "#D7D7D7"); // Reset the color back to original on mouseout
      });
  };

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();
    const g = svg.append("g"); // Add a group element to the SVG
    // const { width, height } = svg.node().getBoundingClientRect();
  
    const sankeyGenerator = sankey()
      .nodeWidth(15)
      .nodePadding(10)
      .extent([
        [1, 1],
        [width - 1, height - 5],
      ])
      .nodeId((d) => d.id)
      .nodeAlign(sankeyCenter);
  
    const { nodes, links } = sankeyGenerator(sankeyData);
  
    drawNodes(g, nodes); // Draw the nodes and links on the group element
    addLabels(g, nodes, width);
    drawLinks(g, links);
  
    zoom.on("zoom", (event) => {
      g.attr("transform", event.transform); // Apply the zoom transformations to the group element
    });
  
    svg.call(zoom);
  }, [sankeyData]);

  return (
    <div>
      <CurrentPointTooltip currentPoint={currentPoint}>
        <svg ref={svgRef} style={{ width, height }}></svg>
      </CurrentPointTooltip>
    </div>
  );
};

export default SankeyDiagram;
