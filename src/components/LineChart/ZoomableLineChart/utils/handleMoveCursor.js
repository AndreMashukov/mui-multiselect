import moment from "moment";
import * as d3 from "d3";

/* eslint-disable import/prefer-default-export */
export const handleMoveCursor = (
  event,
  dataArray,
  x,
  y,
  focus,
  focusText,
  tooltip,
  colors
) => {
  const [x0] = d3.pointer(event);
  const bisect = d3.bisector((d) => d.date).left;

  const selectedDataArray = dataArray.map((data) => {
    let i = bisect(data, x.invert(x0));

    if (i === 0) {
      const d0 = data[0];
      const d1 = data[1];
      i = x.invert(x0) - d0.date > d1.date - x.invert(x0) ? 1 : 0;
    } else if (i >= data.length) {
      i = data.length - 1;
    } else {
      const currentPoint = data[i];
      const prevPoint = i > 0 ? data[i - 1] : null;

      const distanceToPrev = prevPoint
        ? Math.abs(currentPoint.date - prevPoint.date)
        : null;

      const distanceOfMousePointer = Math.abs(currentPoint.date - x.invert(x0));

      if (prevPoint && distanceOfMousePointer > distanceToPrev / 2) {
        i -= 1;
      }
    }

    return data[i];
  });

  focus
    .attr("x1", x(selectedDataArray[0].date))
    .attr("x2", x(selectedDataArray[0].date));

  focusText
    .attr("x", x(selectedDataArray[0].date) + 15)
    .attr("y", y(selectedDataArray[0].value));

  if (tooltip) {
    tooltip
      .html(() => {
        const date = moment(selectedDataArray[0].date).format(
          "YYYY-MM-DD HH:mm"
        );
        const values = selectedDataArray
          .map(
            (item, index) =>
              `<div><span style="background-color:${colors[index]};width:10px;height:10px;border-radius:50%;display:inline-block;margin-right:5px;"></span>${item.value}</div>`
          )
          .join("");
        return `<div>${date}</div><div>${values}</div>`;
      })
      .style("left", `${event.pageX + 15}px`)
      .style("top", `${event.pageY + 15}px`)
      .style("opacity", 1);
  }

  return selectedDataArray[0];
};
