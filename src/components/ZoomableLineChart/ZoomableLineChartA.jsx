import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import moment from "moment";

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

  function updateChart(event, x, y, xAxis, line, brush) {
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

  const handleChartDoubleClick = (data, x, y, xAxis, line) => {
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

      const line = createLine(svg, data, x, y);
      const brush = createBrush();

      brush.on("end", (event) => updateChart(event, x, y, xAxis, line, brush));
      line.append("g").attr("class", "brush").call(brush);
      svg.on("dblclick", () => handleChartDoubleClick(data, x, y, xAxis, line));
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
    });
  }, []);

  return <div ref={ref}></div>;
};

export default ZoomableLineChart;

{
  /* <script>

// set the dimensions and margins of the graph
var margin = {top: 10, right: 30, bottom: 30, left: 60},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#my_dataviz")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

//Read the data
d3.csv("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/data_IC.csv",function(data) {

  // Add X axis --> it is a date format
  var x = d3.scaleLinear()
    .domain([1,100])
    .range([ 0, width ]);
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

  // Add Y axis
  var y = d3.scaleLinear()
    .domain([0, 13])
    .range([ height, 0 ]);
  svg.append("g")
    .call(d3.axisLeft(y));

  // This allows to find the closest X index of the mouse:
  var bisect = d3.bisector(function(d) { return d.x; }).left;

  // Create the circle that travels along the curve of chart
  var focus = svg
    .append('g')
    .append('circle')
      .style("fill", "none")
      .attr("stroke", "black")
      .attr('r', 8.5)
      .style("opacity", 0)

  // Create the text that travels along the curve of chart
  var focusText = svg
    .append('g')
    .append('text')
      .style("opacity", 0)
      .attr("text-anchor", "left")
      .attr("alignment-baseline", "middle")

  // Add the line
  svg
    .append("path")
    .datum(data)
    .attr("fill", "none")
    .attr("stroke", "steelblue")
    .attr("stroke-width", 1.5)
    .attr("d", d3.line()
      .x(function(d) { return x(d.x) })
      .y(function(d) { return y(d.y) })
      )

  // Create a rect on top of the svg area: this rectangle recovers mouse position
  svg
    .append('rect')
    .style("fill", "none")
    .style("pointer-events", "all")
    .attr('width', width)
    .attr('height', height)
    .on('mouseover', mouseover)
    .on('mousemove', mousemove)
    .on('mouseout', mouseout);


  // What happens when the mouse move -> show the annotations at the right positions.
  function mouseover() {
    focus.style("opacity", 1)
    focusText.style("opacity",1)
  }

  function mousemove() {
    // recover coordinate we need
    var x0 = x.invert(d3.mouse(this)[0]);
    var i = bisect(data, x0, 1);
    selectedData = data[i]
    focus
      .attr("cx", x(selectedData.x))
      .attr("cy", y(selectedData.y))
    focusText
      .html("x:" + selectedData.x + "  -  " + "y:" + selectedData.y)
      .attr("x", x(selectedData.x)+15)
      .attr("y", y(selectedData.y))
    }
  function mouseout() {
    focus.style("opacity", 0)
    focusText.style("opacity", 0)
  }

}) */
}
