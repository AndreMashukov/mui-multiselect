import * as d3 from "d3";
import moment from "moment";

export const handleMoveCursor = (event, dataArray, x, y, focus, focusText) => {
  const [x0] = d3.pointer(event);
  const bisect = d3.bisector((d) => d.date).left;

  const selectedDataArray = dataArray.map((data) => {
    let i = bisect(data, x.invert(x0));

    if (i === 0) {
      const d0 = data[0];
      const d1 = data[1];
      i = x.invert(x0) - d0.date > d1.date - x.invert(x0) ? 1 : 0;
    }

    return data[i];
  });

  focus
    .attr("x1", x(selectedDataArray[0].date))
    .attr("x2", x(selectedDataArray[0].date));
  focusText
    .attr("x", x(selectedDataArray[0].date) + 15)
    .attr("y", y(selectedDataArray[0].value));

  // Create a JSON object from the selectedDataArray
  const selectedDataJson = selectedDataArray.reduce((json, data, index) => {
    json.date = moment(data.date).format("YYYY-MM-DD HH:mm");
    json[`line${index + 1}`] = data.value;

    return json;
  }, {});

  // Format the selectedDataJson object as a string with the x coordinate on top and the y coordinates below it
  // const tooltipContent = Object.entries(selectedDataJson)
  //   .map(([line, data]) => `${line}\n${data.date}\n${data.value}`)
  //   .join("\n\n");

  return selectedDataJson;
};

// focusText
// .html(
//   selectedDataArray
//     .map(
//       (selectedData) =>
//         "x:" +
//         moment(selectedData.date).format("DD/MM/YYYY HH:mm") +
//         "  -  " +
//         "y:" +
//         selectedData.value
//     )
//     .join("<br>")
// )
