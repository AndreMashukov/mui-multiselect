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

  focus.attr("x1", x(selectedDataArray[0].date)).attr("x2", x(selectedDataArray[0].date));
  focusText
    .html(
      selectedDataArray
        .map(
          (selectedData) =>
            "x:" +
            moment(selectedData.date).format("DD/MM/YYYY HH:mm") +
            "  -  " +
            "y:" +
            selectedData.value
        )
        .join("<br>")
    )
    .attr("x", x(selectedDataArray[0].date) + 15)
    .attr("y", y(selectedDataArray[0].value));

  // Create a JSON object from the selectedDataArray
  const selectedDataJson = selectedDataArray.reduce((json, data, index) => {
    json[`line${index + 1}`] = {
      date: moment(data.date).format("DD/MM/YYYY HH:mm"),
      value: data.value,
    };
    return json;
  }, {});

  return selectedDataJson;
};