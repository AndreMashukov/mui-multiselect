import React, { useState } from "react";
import { Box, Tabs, Tab } from "@mui/material";
import AnimatedList from "../components/AnimatedList/AnimatedList";
import { Page } from "../components/Page/page";

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
    <Page title="Dashboard">
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="General" {...a11yProps(0)} />
            <Tab label="Leaderboard" {...a11yProps(1)} />
          </Tabs>
        </Box>
        {value === 0 && (
          <TabPanel key={value} value={value} index={0}>
            General Tab
          </TabPanel>
        )}
        {value === 1 && (
          <TabPanel key={value} value={value} index={1}>
            <AnimatedList />
          </TabPanel>
        )}
      </Box>
    </Page>
  );
};
