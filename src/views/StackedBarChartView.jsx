import { useState } from "react";
import StackedBarChart from "../components/StackedBarChart/StackedBarChart";
import BasicBarChart from "../components/BasicBarChart/BasicBarChart";
import { Box, Grid, IconButton, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { CurrentPointTooltip } from "../components/StackedBarChart/CurrentPointTooltip/CurrentPointTooltip";

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
  const [hoveredSectionData, setHoveredSectionData] = useState();

  return (
    <Grid flexDirection="column" container>
      <Box>
        <Grid container sx={{ minHeight: "50px" }}>
          {selectedData && (
            <Grid item>
              <Grid container>
                <Grid item sx={{ position: "relative" }}>
                  <IconButton
                    sx={{ top: "-7px" }}
                    onClick={() => setSelectedData(undefined)}
                  >
                    <ArrowBackIcon />
                  </IconButton>
                </Grid>
                <Grid item sx={{ pl: 1 }}>
                  <Typography>{selectedData.group}</Typography>
                </Grid>
              </Grid>
            </Grid>
          )}
          {!selectedData && (
            <Grid item sx={{ ml: 5 }}>
              <Typography>Stacked Bar Chart</Typography>
            </Grid>
          )}
        </Grid>
      </Box>
      <Box sx={{ height: "50vh" }}>
        {!selectedData && (
          <CurrentPointTooltip currentPoint={hoveredSectionData}>
            <StackedBarChart
              data={data}
              setSelectedData={setSelectedData}
              setHoveredSectionData={setHoveredSectionData}
            />
          </CurrentPointTooltip>
        )}
        {selectedData && <BasicBarChart data={selectedData.data} />}
      </Box>
    </Grid>
  );
};
