import { useState } from "react";
import { Box, Button, Divider, List, Stack, Typography } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import { COLUMN_WIDTH, INTERNET_TRAFFIC_LEADER_BOARD } from "./constants";
import { motion, AnimatePresence } from "framer-motion";
import ListItemComponent from "./ListItemComponent/ListItemComnponent";
import moment from "moment";
import useGetDevice from "../../hooks/useGetDevice";

const VerticalDivider = () => (
  <Box display="flex" alignItems="center" sx={{ mx: 2 }}>
    <Divider
      orientation="vertical"
      sx={{ bgcolor: "grey.100", height: "25px", width: "2px" }}
    />
  </Box>
);

const AnimatedList = () => {
  const [items, setItems] = useState(INTERNET_TRAFFIC_LEADER_BOARD);
  const [lastUpdated, setLastUpdated] = useState(moment());

  const shuffleItems = () => {
    setLastUpdated(moment());
    const newItems = [...items];
    const previousRanks = new Map(
      items.map((item) => [item.customerId, item.rank])
    );

    // Shuffle the items
    for (let i = newItems.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newItems[i], newItems[j]] = [newItems[j], newItems[i]];
    }

    // Update ranks and calculate rankChangeDirection
    const updatedItems = newItems.map((item, index) => {
      const newRank = index + 1;
      const previousRank = previousRanks.get(item.customerId);
      let rankChangeDirection = "none";

      if (previousRank < newRank) {
        rankChangeDirection = "down";
      } else if (previousRank > newRank) {
        rankChangeDirection = "up";
      }

      return { ...item, rank: newRank, rankChangeDirection };
    });

    setItems(updatedItems);
  };

  const { isMobile } = useGetDevice();

  return (
    <Box
      p={2}
      sx={{
        minWidth: isMobile ? "300px" : "500px",
        width: {
          xs: "90vw",
          sm: "70vw",
          md: "70vw",
        },
      }}
    >
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
          <Button
            startIcon={<RefreshIcon />}
            variant="contained"
            onClick={shuffleItems}
          >
            Refresh
          </Button>
          <VerticalDivider />
          <Typography>Last 24 hours Peak</Typography>
          <VerticalDivider />
          <Typography>Last 7 days Peak</Typography>
        </Stack>
      </Stack>
      <List sx={{ position: "relative" }}>
        {/* Fixed Header Row */}
        <ListItemComponent columnWidths={COLUMN_WIDTH} isHeader={true} />
      </List>
      <Box sx={{ height: "400px", overflowY: "auto" }}>
        <AnimatePresence>
          <List>
            {items.map((item) => (
              <motion.div
                key={item.customerId}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                layout
                transition={{ duration: 0.5 }}
              >
                <ListItemComponent
                  key={item.customerId}
                  item={item}
                  columnWidths={COLUMN_WIDTH}
                  isHeader={false}
                />
              </motion.div>
            ))}
          </List>
        </AnimatePresence>
      </Box>
    </Box>
  );
};

export default AnimatedList;
