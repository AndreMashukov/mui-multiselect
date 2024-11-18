import React from "react";
import PropTypes from "prop-types";
import {Typography} from "@mui/material";

const ThresholdLegend = ({thresholds}) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        flexWrap: "wrap",
      }}
    >
      {thresholds
        .filter((t) => t.description)
        .map((threshold, index) => (
          <div
            key={index}
            style={{display: "flex", alignItems: "center", margin: "0 10px"}}
          >
            <div
              style={{
                width: "20px",
                height: "0px",
                borderBottom: `2px dashed ${threshold.color}`,
                marginRight: "5px",
              }}
            ></div>
            <Typography variant="caption">{threshold.description}</Typography>
          </div>
        ))}
    </div>
  );
};

export default ThresholdLegend;

ThresholdLegend.propTypes = {
  thresholds: PropTypes.array.isRequired,
};
