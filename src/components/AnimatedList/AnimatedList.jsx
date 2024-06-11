import { useState } from "react";
import { Box, Button, List, Stack, ListItem, Typography } from "@mui/material";
import { Shuffle } from "@mui/icons-material";
import { COLUMN_WIDTH, INTERNET_TRAFFIC_LEADER_BOARD } from "./constants";
import { motion, AnimatePresence } from "framer-motion";
import ListItemComponent from "./ListItemComponent/ListItemComnponent";
import moment from "moment";

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

  return (
    <Box p={2} width="50vw">
      <Stack direction="row" spacing={2} mb={2} justifyContent="space-between">
        <Stack>
          <Typography variant="body1">
            Last Updated: {lastUpdated.format("MMM DD, YYYY hh:mm:ss")}
          </Typography>
        </Stack>
        <Button
          startIcon={<Shuffle />}
          variant="contained"
          onClick={shuffleItems}
        >
          Shuffle
        </Button>
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
                transition={{ duration: 1.5 }}
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
