import { useState } from "react";
import StackedBarChart from "../components/StackedBarChart/StackedBarChart";
import BasicBarChart from "../components/BasicBarChart/BasicBarChart";
import { Box, Grid, IconButton, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const data = [
  {
    group: "banana",
    Nitrogen: "12",
    normal: "1",
    stress: "13",
  },
  {
    group: "poacee",
    Nitrogen: "6",
    normal: "6",
    stress: "33",
  },
  {
    group: "sorgho",
    Nitrogen: "11",
    normal: "28",
    stress: "12",
  },
  {
    group: "triticum",
    Nitrogen: "19",
    normal: "6",
    stress: "1",
  },
];

data.columns = ["group", "Nitrogen", "normal", "stress"];

export const StackedBarChartView = () => {
  const [selectedData, setSelectedData] = useState();
  return (
    <>
      <Box>
        <Grid container sx={{ minHeight: "50px" }}>
          {selectedData && (
            <Grid item>
              <Grid container>
                <Grid item>
                  <IconButton onClick={() => setSelectedData(undefined)}>
                    <ArrowBackIcon />
                  </IconButton>
                </Grid>
                <Grid item>
                  <Typography>{selectedData.group}</Typography>
                </Grid>
              </Grid>
            </Grid>
          )}
          {!selectedData && (
            <Grid item>
              <Typography>Stacked Bar Chart</Typography>
            </Grid>
          )}
        </Grid>
      </Box>
      {!selectedData && (
        <StackedBarChart data={data} setSelectedData={setSelectedData} />
      )}
      {selectedData && <BasicBarChart data={selectedData.data} />}
    </>
  );
};
