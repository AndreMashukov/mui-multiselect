/* eslint-disable no-use-before-define */
import React, {useRef, useEffect, useCallback} from "react";
import * as d3 from "d3";
import {debounce} from "lodash";
import {Box, Stack} from "@mui/material";
import ChartLegend from "../ChartLegend/ChartLegend";
import ThresholdLegend from "./ThresholdLegend/ThresholdLegend";

interface Threshold {
  value: number;
  color: string;
}

interface LineChartThresholdCommonProps {
  createPlot: (domain?: [number, number]) => any;
  dataArray: any[];
  width?: number;
  height?: number;
  colors: string[];
  labels: string[];
  thresholds?: Threshold[];
}

const LineChartThresholdCommon: React.FC<LineChartThresholdCommonProps> = ({
  createPlot,
  dataArray,
  width,
  height,
  colors,
  labels,
  thresholds,
}) => {
  const plotRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<d3.Selection<
    SVGSVGElement,
    unknown,
    null,
    undefined
  > | null>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const widthLocal = width || 800;
  const heightLocal = height || 400;

  const applyBrush = (
    svgElement: d3.Selection<SVGSVGElement, unknown, null, undefined>,
    plot: any
  ) => {
    const brush = d3
      .brushX()
      .extent([
        [0, 0],
        [widthLocal, heightLocal],
      ])
      .on("end", (event: any) => {
        const {selection} = event;
        if (selection === null) return;

        const [x0, x1] = selection.map((d: number) =>
          plot.scale("x").invert(d)
        );
        const updatedPlot = createPlot([x0, x1]);
        renderPlot(updatedPlot);
      });

    svgElement.append("g").attr("class", "brush").call(brush);
  };

  const renderPlot = (currentPlot: any) => {
    if (plotRef.current && plotRef.current.firstChild) {
      plotRef.current.removeChild(plotRef.current.firstChild);
    }
    if (plotRef.current) {
      plotRef.current.appendChild(currentPlot);
    }

    const svgElement = d3.select(plotRef.current).select("svg");

    svgRef.current = svgElement as d3.Selection<
      SVGSVGElement,
      unknown,
      null,
      undefined
    >;
    applyBrush(svgElement, currentPlot);
  };

  const hideTooltip = () => {
    if (tooltipRef.current) {
      d3.select(tooltipRef.current).style("visibility", "hidden");
    }
  };

  const outputPointInfo = (cx: number, cy: number, title: string) => {
    if (!tooltipRef.current || !containerRef.current) return;

    const tooltip = d3.select(tooltipRef.current);
    const containerRect = containerRef.current.getBoundingClientRect();

    tooltip
      .style("visibility", "visible")
      .html(title)
      .style("left", `${containerRect.left + cx + 10}px`)
      .style("top", `${containerRect.top + cy + 10}px`);
  };

  const checkProximity = useCallback(
    debounce((x: number, y: number) => {
      if (!svgRef.current) return;

      const circles = svgRef.current.selectAll<SVGCircleElement, unknown>(
        "circle"
      );
      const radius = 10;

      let found = false;

      circles.each(function () {
        const circle = d3.select(this);
        const cx = +circle.attr("cx");
        const cy = +circle.attr("cy");
        const title = circle.select("title").text();
        const distance = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2);
        if (distance < radius && title) {
          outputPointInfo(cx, cy, title);
          found = true;
        }
      });

      if (!found) {
        hideTooltip();
      }
    }, 200),
    [svgRef.current]
  );

  useEffect(() => {
    const plot = createPlot();
    renderPlot(plot);

    // Initialize tooltip
    if (tooltipRef.current) {
      d3.select(tooltipRef.current)
        .style("position", "absolute")
        .style("visibility", "hidden")
        .style("background", "#fff")
        .style("border", "1px solid #ccc")
        .style("padding", "5px")
        .style("border-radius", "4px")
        .style("pointer-events", "none")
        .style("display", "flex")
        .style("align-items", "center");
    }

    if (plotRef.current) {
      d3.select(plotRef.current)
        .on("dblclick", () => {
          const resetPlot = createPlot();
          renderPlot(resetPlot);
          hideTooltip();
        })
        .on("mousemove", (event) => {
          const [x, y] = d3.pointer(event);
          checkProximity(x, y);
        })
        .on("mouseout", hideTooltip);
    }

    return () => {
      if (plotRef.current && plotRef.current.firstChild) {
        plotRef.current.removeChild(plotRef.current.firstChild);
      }
    };
  }, [dataArray, width, height, colors, thresholds]);

  return (
    <Box sx={{width: widthLocal}} ref={containerRef}>
      <div ref={plotRef} style={{position: "relative"}}></div>
      <div ref={tooltipRef}></div>
      <Stack direction="row" spacing={2} justifyContent="center">
        <ChartLegend colors={colors} labels={labels} />
        <ThresholdLegend thresholds={thresholds} />
      </Stack>
    </Box>
  );
};


export default LineChartThresholdCommon;
