/* eslint-disable react/prop-types */
import { Paper } from "@mui/material";

// eslint-disable-next-line react/prop-types
const TooltipContent = ({ currentPoint }) => {
  return (
    <Paper elevation={1}>
      <div style={{ padding: "10px" }}>
        <div>
          Date: {currentPoint?.date}
        </div>
        <div>
          Value: {currentPoint?.value}
        </div>
      </div>
    </Paper>
  );
}

export default TooltipContent;