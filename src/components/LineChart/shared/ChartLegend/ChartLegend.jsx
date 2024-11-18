import React from "react";
import PropTypes from "prop-types";

const ChartLegend = ({colors, labels, width}) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        width,
      }}
    >
      {labels.map((label, index) => (
        <div
          key={index}
          style={{display: "flex", alignItems: "center", margin: "0 10px"}}
        >
          <div
            style={{
              width: "20px",
              height: "20px",
              backgroundColor: colors[index],
              marginRight: "5px",
            }}
          ></div>
          <div>{label}</div>
        </div>
      ))}
    </div>
  );
};

export default ChartLegend;

ChartLegend.propTypes = {
  colors: PropTypes.array.isRequired,
  labels: PropTypes.array.isRequired,
  width: PropTypes.number,
};
