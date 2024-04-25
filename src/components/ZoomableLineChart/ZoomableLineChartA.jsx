/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react";
import * as d3 from "d3";
import moment from "moment";

const WIDTH = 800;
const HEIGHT = 400;

const ZoomableLineChart = ({ data }) => {
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

  const createLine = (svg, data, x, y) => {
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

    return line;
  };

  function updateChart(event, x, y, xAxis, line, brush, dots) {
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
    dots
      .selectAll(".dot")
      .attr("cx", function (d) {
        return x(d.date);
      })
      .attr("cy", function (d) {
        return y(d.value);
      });
  }

  const handleChartDoubleClick = (data, x, y, xAxis, line, dots) => {
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
    dots
      .selectAll(".dot")
      .attr("cx", function (d) {
        return x(d.date);
      })
      .attr("cy", function (d) {
        return y(d.value);
      });
  };

  const createBrush = () => {
    return d3.brushX().extent([
      [0, 0],
      [width, height],
    ]);
  };

  const createCursor = (svg) => {
    const focus = svg
      .append("g")
      .append("circle")
      .style("fill", "none")
      .attr("stroke", "black")
      .attr("r", 8.5)
      .style("opacity", 0);

    const focusText = svg
      .append("g")
      .append("text")
      .style("opacity", 0)
      .attr("text-anchor", "left")
      .attr("alignment-baseline", "middle");

    return { focus, focusText };
  };

  const handleMoveCursor = (event, data, x, y, focus, focusText) => {
    const [x0] = d3.pointer(event);
    const bisect = d3.bisector((d) => d.date).left;
    const i = bisect(data, x.invert(x0), 1);
    const selectedData = data[i];
    focus.attr("cx", x(selectedData.date)).attr("cy", y(selectedData.value));
    focusText
      .html(
        "x:" +
          moment(selectedData.date).format("DD/MM/YYYY") +
          "  -  " +
          "y:" +
          selectedData.value
      )
      .attr("x", x(selectedData.date) + 15)
      .attr("y", y(selectedData.value));
  };

  const addDots = (svg, data, x, y) => {
    const dotsGroup = svg.append("g").attr("clip-path", "url(#clip)");

    dotsGroup
      .selectAll(".dot")
      .data(data)
      .enter()
      .append("circle")
      .attr("class", "dot")
      .attr("cx", function (d) {
        return x(d.date);
      })
      .attr("cy", function (d) {
        return y(d.value);
      })
      .attr("r", 1.5)
      .attr("fill", "indigo");

    return dotsGroup;
  };
  useEffect(() => {
    d3.select(ref.current).selectAll("*").remove();

    const svg = createSvg(ref);

    const { x, y, xAxis } = createAxes(svg, data);
    addClipping(svg);

    const line = createLine(svg, data, x, y);
    const brush = createBrush();
    const dots = addDots(svg, data, x, y);

    brush.on("end", (event) =>
      updateChart(event, x, y, xAxis, line, brush, dots)
    );
    line.append("g").attr("class", "brush").call(brush);
    svg.on("dblclick", () =>
      handleChartDoubleClick(data, x, y, xAxis, line, dots)
    );
    const { focus, focusText } = createCursor(svg);

    svg
      .on("mouseover", function () {
        focus.style("opacity", 1);
        focusText.style("opacity", 1);
      })
      .on("mousemove", (event) =>
        handleMoveCursor(event, data, x, y, focus, focusText)
      )
      .on("mouseout", function () {
        focus.style("opacity", 0);
        focusText.style("opacity", 0);
      });
  }, [data]);

  return <div ref={ref}></div>;
};

export default ZoomableLineChart;
