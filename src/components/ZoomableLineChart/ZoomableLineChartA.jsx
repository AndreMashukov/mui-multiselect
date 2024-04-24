import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const WIDTH = 600;
const HEIGHT = 400;

const ZoomableLineChart = () => {
  const ref = useRef();
  const margin = { top: 10, right: 30, bottom: 30, left: 60 };
  const width = WIDTH - margin.left - margin.right;
  const height = HEIGHT - margin.top - margin.bottom;
  let idleTimeout;
  function idled() {
    idleTimeout = null;
  }

  const createSvg = (ref) => {
    const svg = d3
      .select(ref.current)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    return svg;
  };

  const createAxes = (svg, data) => {
    // scale X
    const x = d3
      .scaleTime()
      .domain(
        d3.extent(data, function (d) {
          return d.date;
        })
      )
      .range([0, width]);

    // axis X
    const xAxis = svg
      .append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(x));

    // scale Y
    const y = d3
      .scaleLinear()
      .domain([
        0,
        d3.max(data, function (d) {
          return +d.value;
        }),
      ])
      .range([height, 0]);

    // axis Y
    const yAxis = svg.append("g").call(d3.axisLeft(y));
    return { x, y, xAxis, yAxis };
  };

  const addClipping = (svg) => {
    svg
      .append("defs")
      .append("svg:clipPath")
      .attr("id", "clip")
      .append("svg:rect")
      .attr("width", width)
      .attr("height", height)
      .attr("x", 0)
      .attr("y", 0);
  };

  useEffect(() => {
    d3.select(ref.current).selectAll("*").remove();

    const svg = createSvg(ref);

    d3.csv(
      "https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/3_TwoNumOrdered_comma.csv",
      function (d) {
        return { date: d3.timeParse("%Y-%m-%d")(d.date), value: d.value };
      }
    ).then(function (data) {
      const { x, y, xAxis } = createAxes(svg, data);
      addClipping(svg);

      const brush = d3
        .brushX()
        .extent([
          [0, 0],
          [width, height],
        ])
        .on("end", updateChart);

      const line = svg.append("g").attr("clip-path", "url(#clip)");

      line
        .append("path")
        .datum(data)
        .attr("class", "line")
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 1.5)
        .attr(
          "d",
          d3
            .line()
            .x(function (d) {
              return x(d.date);
            })
            .y(function (d) {
              return y(d.value);
            })
        );

      line.append("g").attr("class", "brush").call(brush);

      function updateChart(event, d) {
        const extent = event.selection;

        if (!extent) {
          if (!idleTimeout) return (idleTimeout = setTimeout(idled, 350));
          x.domain([4, 8]);
        } else {
          x.domain([x.invert(extent[0]), x.invert(extent[1])]);
          line.select(".brush").call(brush.move, null);
        }

        xAxis.transition().duration(1000).call(d3.axisBottom(x));
        line
          .select(".line")
          .transition()
          .duration(1000)
          .attr(
            "d",
            d3
              .line()
              .x(function (d) {
                return x(d.date);
              })
              .y(function (d) {
                return y(d.value);
              })
          );
      }

      svg.on("dblclick", function () {
        x.domain(
          d3.extent(data, function (d) {
            return d.date;
          })
        );
        xAxis.transition().call(d3.axisBottom(x));
        line
          .select(".line")
          .transition()
          .attr(
            "d",
            d3
              .line()
              .x(function (d) {
                return x(d.date);
              })
              .y(function (d) {
                return y(d.value);
              })
          );
      });
    });
  }, []);

  return <div ref={ref}></div>;
};

export default ZoomableLineChart;
