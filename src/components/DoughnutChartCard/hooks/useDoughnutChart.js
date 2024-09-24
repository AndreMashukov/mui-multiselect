import {useRef, useEffect, useState} from "react";
import * as d3 from "d3";

export const BASE_COLORS = [
  "#e03138", // Bright red
  "#f78600", // Bright orange
  "#f2dc34", // Bright yellow
  "#40ff00", // Bright green
  "#1b70c0", // Bright blue
  "#c2adc2", // Light gray
];

const useDoughnutChart = (graphData) => {
  const chartRef = useRef(null);
  const cardContentRef = useRef(null);
  const centerBoxRef = useRef(null);
  const isFirstLoad = useRef(true);
  const tooltipRef = useRef(null);
  const [showCenterContent, setShowCenterContent] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShowCenterContent(true);
    }, 1000); // Show content after 1 second

    return () => clearTimeout(timeoutId); // Cleanup timeout on unmount
  }, []);

  useEffect(() => {
    // Create the tooltip div
    const tooltip = d3
      .select("body")
      .append("div")
      .style("position", "absolute")
      .style("visibility", "hidden")
      .style("background-color", "white")
      .style("border", "1px solid #ccc")
      .style("padding", "8px")
      .style("border-radius", "4px")
      .style("box-shadow", "0 0 10px rgba(0, 0, 0, 0.1)")
      .style("pointer-events", "none")
      .html(""); // Initial empty HTML

    tooltipRef.current = tooltip;

    // Cleanup function to remove the tooltip div when the component is unmounted
    return () => {
      tooltip.remove();
    };
  }, []);

  const drawChart = () => {
    const width = cardContentRef.current.clientWidth;
    const height = cardContentRef.current.clientHeight;
    const margin = 0;
    const radius = Math.min(width, height) / 0.9 - margin; // Radius of the pie chart

    d3.select(chartRef.current).selectAll("*").remove();

    const svg = d3
      .select(chartRef.current)
      .attr("width", "100%")
      .attr("height", "100%")
      .append("g")
      .attr("transform", `translate(${width / 2},${height / 1.05})`); // Transform to center the chart vertically

    const color = (i) => BASE_COLORS[i % BASE_COLORS.length];

    const pie = d3
      .pie()
      .sort(null)
      .startAngle(-Math.PI / 2)
      .endAngle(Math.PI / 2)
      .value((d) => d)(graphData.graph);

    const arc = d3
      .arc()
      .innerRadius(radius * 0.5)
      .outerRadius(radius * 0.8);

    const slices = svg
      .selectAll("allSlices")
      .data(pie)
      .enter()
      .append("g")
      .attr("class", "slice");

    slices
      .append("path")
      .attr("fill", (d, i) => color(i))
      .attr("stroke", "white")
      .style("stroke-width", "2px")
      .style("opacity", 0.7)
      .attr("d", arc);

    slices
      .select("path")
      .on("mouseover", function () {
        tooltipRef.current.style("visibility", "visible");
        d3.select(this).style("opacity", 1);
      })
      .on("mousemove", function (event, d) {
        const colorBox = `<span style="display:inline-block;width:12px;height:12px;background-color:${color(d.index)};margin-right:5px;"></span>`;

        tooltipRef.current
          .html(`${graphData.types[d.index].title}: ${colorBox} ${d.value}`)
          .style("top", `${event.pageY - 10}px`)
          .style("left", `${event.pageX + 10}px`);
      })
      .on("mouseout", function () {
        tooltipRef.current.style("visibility", "hidden");
        d3.select(this).style("opacity", 0.7);
      });

    if (isFirstLoad.current) {
      slices
        .select("path")
        .transition()
        .duration(1000)
        .attrTween("d", function (d) {
          const interpolate = d3.interpolate(
            {startAngle: -Math.PI / 2, endAngle: -Math.PI / 2},
            d
          );
          return function (t) {
            return arc(interpolate(t));
          };
        });
      isFirstLoad.current = false;
    } else {
      slices.select("path").attr("d", arc);
    }
  };

  useEffect(() => {
    drawChart();
    const handleResize = () => drawChart();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [graphData]);

  useEffect(() => {
    // Trigger a resize event after the content has been fully rendered
    const triggerResize = () => {
      window.dispatchEvent(new Event("resize"));
    };
    const timeoutId = setTimeout(triggerResize, 1000); // Trigger after 1 second

    return () => clearTimeout(timeoutId); // Cleanup timeout on unmount
  }, []);

  return {
    chartRef,
    cardContentRef,
    centerBoxRef,
    showCenterContent,
  };
};

export default useDoughnutChart;
