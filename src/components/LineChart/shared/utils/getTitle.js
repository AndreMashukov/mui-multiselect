import moment from "moment";

const getTitle = (d, color) => {
  return `<span style="display:flex; align-items:center;">
  <span style="width:10px; height:10px; background-color:${color}; display:inline-block; margin-right:5px;"></span>
  ${moment(d.date).format("DD/MM/YYYY HH:mm")}: ${d.value}`;
};

export default getTitle;
