import React, { useState } from "react";
import { Box, Tabs, Tab } from "@mui/material";
import AnimatedList from "../components/AnimatedList/AnimatedList";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `tab-${index}`,
    "aria-controls": `tabpanel-${index}`,
  };
}

export const AnimatedListView = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange}>
          <Tab label="General" {...a11yProps(0)} />
          <Tab label="Leaderboard" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Box sx={{ minHeight: "600px" }}>General content goes here.</Box>
      </TabPanel>
      <TabPanel value={value} index={1} sx={{
        backgroundColor: "red"
      }}>
        <AnimatedList />
      </TabPanel>
    </Box>
  );
};
