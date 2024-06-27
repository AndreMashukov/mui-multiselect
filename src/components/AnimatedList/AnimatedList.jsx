import { useState, useEffect } from "react";
import { Box, List } from "@mui/material";
import { COLUMN_WIDTH, INTERNET_TRAFFIC_LEADER_BOARD } from "./constants";
import { motion, AnimatePresence } from "framer-motion";
import ListItemComponent from "./ListItemComponent/ListItemComnponent";
import moment from "moment";
import useGetDevice from "../../hooks/useGetDevice";
import StackBottom from "./StackBottom/StackBottom";
import backgroundImage from "./telecom-background.png";
import StackTop from "./StackTop/StackTop";

const AnimatedList = () => {
  const [items, setItems] = useState(INTERNET_TRAFFIC_LEADER_BOARD);
  const [lastUpdated, setLastUpdated] = useState(moment());
  const [refreshInterval, setRefreshInterval] = useState("stop");

  useEffect(() => {
    let interval;
    if (refreshInterval !== "stop") {
      interval = setInterval(() => {
        shuffleItems();
      }, parseInt(refreshInterval) * 1000);
    }
    return () => clearInterval(interval);
  }, [refreshInterval]);

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

  function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  }

  const { isMobile } = useGetDevice();

  return (
    <Box
      sx={{
        background: `url(${backgroundImage}) no-repeat center center/cover`,
        padding: isMobile ? "0px" : "30px 50px",
      }}
    >
      <Box
        p={2}
        sx={{
          background: (theme) => {
            const rgb = hexToRgb(theme.palette.secondary.main);
            return rgb
              ? `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.75)`
              : theme.palette.secondary.main;
          },
          // opacity: 0.5,
          color: "white",
        }}
      >
        <StackTop
          refreshInterval={refreshInterval}
          setRefreshInterval={setRefreshInterval}
          shuffleItems={shuffleItems}
        />
        <StackBottom isMobile={isMobile} lastUpdated={lastUpdated} />
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
    </Box>
  );
};

export default AnimatedList;
