import { useState } from "react";
import ZoomableLineChartA from "../components/ZoomableLineChart/ZoomableLineChartA";
import ZoomableLineChart from "../components/ZoomableLineChart/ZoomableLineChart";
import SelectorSecondary from "../components/SelectorSecondary/SelectorSecondary";
import { Grid, Typography } from "@mui/material";

const ZoomableLineChartView = () => {
  const [data, setData] = useState(
    Array.from({ length: 50 }, () => Math.round(Math.random() * 100))
  );
  const [selectedOption, setSelectedOption] = useState();

  const selectorOptions = [
    { id: "day", label: "1 day" },
    { id: "week", label: "1 week" },
    { id: "month", label: "1 month" },
    { id: "year", label: "1 year" },
  ];

  return (
    <div style={{ padding: "20px", width: 800 }}>
      <Grid container justifyContent="space-between">
        <Grid item>
          <Typography variant="h4">Bitcoin Price</Typography>
        </Grid>
        <Grid item>
          <SelectorSecondary
            options={selectorOptions}
            setSelectedOption={setSelectedOption}
            selectedOption={selectedOption}
            extraStyles={{ mb: 2 }}
          />
        </Grid>
      </Grid>
      <div>
        <ZoomableLineChartA />
      </div>
    </div>
  );
};

export default ZoomableLineChartView;
