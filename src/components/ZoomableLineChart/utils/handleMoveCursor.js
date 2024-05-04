import * as d3 from "d3";
import moment from "moment";

export const handleMoveCursor = (event, data, x, y, focus, focusText) => {
  const [x0] = d3.pointer(event);
  const bisect = d3.bisector((d) => d.date).left;
  // Get the index of the data point that the mouse is currently over
  let i = bisect(data, x.invert(x0)); // Remove the `1` argumentw

  // If the index is 0, check if the mouse is closer to the first point or the second point
  if (i === 0) {
    const d0 = data[0];
    const d1 = data[1];
    i = x.invert(x0) - d0.date > d1.date - x.invert(x0) ? 1 : 0;
  }

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