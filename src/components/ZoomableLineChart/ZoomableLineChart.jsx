/* eslint-disable react/prop-types */
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import * as d3 from "d3";
import moment from "moment";
import { useZoomableLineChart } from "./useZoomableLineChart";

const WIDTH = 800;
const HEIGHT = 400;

const ZoomableLineChart = ({ data, width, height }) => {
  const ref = useRef();
  const [svg, setSvg] = useState(null);
  const margin = { top: 10, right: 30, bottom: 30, left: 60 };
  const _width = (width || WIDTH) - margin.left - margin.right;
  const _height = (height || HEIGHT) - margin.top - margin.bottom;

  const props = {
    data,
    _width,
    _height,
    margin,
  };

  const {
    createSvg,
    createAxes,
    addClipping,
    createLine,
    addDots,
    updateDots,
    createBrush,
  } = useZoomableLineChart(svg, props);

  let idleTimeout;
  function idled() {
    idleTimeout = null;
  }

  function updateChart(event, x, y, xAxis, line, brush, dots) {
    // extent - the selected area
    const extent = event.selection;
    dots.selectAll(".dot").style("opacity", 0);

    if (!extent) {
      if (!idleTimeout) return (idleTimeout = setTimeout(idled, 350));
      x.domain([4, 8]);
    } else {
      x.domain([x.invert(extent[0]), x.invert(extent[1])]);
      line.select(".brush").call(brush.move, null);
    }

    // update x axis with the new scale
    xAxis.transition().duration(1000).call(d3.axisBottom(x));

    // generate a new line path with the new x axis
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
      )
      .on("end", () => {
        // Show dots
        dots.selectAll(".dot").style("opacity", 1);
      });
    updateDots(dots, x, y);
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
      )
      .on("end", () => {
        dots.selectAll(".dot").style("opacity", 1);
      });
    updateDots(dots, x, y);
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
          moment(selectedData.date).format("DD/MM/YYYY HH:mm") +
          "  -  " +
          "y:" +
          selectedData.value
      )
      .attr("x", x(selectedData.date) + 15)
      .attr("y", y(selectedData.value));
  };

  useLayoutEffect(() => {
    if (!data || !data.length) return;
    d3.select(ref.current).selectAll("*").remove();
    setSvg(createSvg(ref));
  }, [_width, _height, data]);

  useEffect(() => {
    if (!svg) return;

    const { x, y, xAxis } = createAxes();
    addClipping();

    const line = createLine(x, y);
    const brush = createBrush();
    const dots = addDots(x, y);

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
  }, [svg]);

  return <div ref={ref}></div>;
};

export default ZoomableLineChart;
