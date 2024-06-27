import React from "react";
import { Box, Divider, Stack, Typography } from "@mui/material";

const VerticalDivider = () => (
  <Box display="flex" alignItems="center" sx={{ mx: 2 }}>
    <Divider
      orientation="vertical"
      sx={{ bgcolor: "grey.100", height: "25px", width: "2px" }}
    />
  </Box>
);

const StackBottom = ({ isMobile, lastUpdated }) => (
  <Stack
    direction={isMobile ? "column" : "row"}
    spacing={2}
    mb={2}
    justifyContent="space-between"
    alignItems="flex-end"
  >
    <Stack>
      <Typography variant="body1">
        Last Updated: {lastUpdated.format("MMM DD, YYYY hh:mm:ss")}
      </Typography>
    </Stack>
    <Stack
      spacing={2}
      justifyContent="space-between"
      direction="row"
      alignItems="flex-end"
    >
      <Typography>Last 24 hours Peak</Typography>
      <VerticalDivider />
      <Typography>Last 7 days Peak</Typography>
    </Stack>
  </Stack>
);

export default StackBottom;
