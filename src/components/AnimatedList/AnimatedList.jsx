import { useState } from "react";
import FlipMove from "react-flip-move";
import { Box, Button, List, Stack } from "@mui/material";
import { Shuffle } from "@mui/icons-material";
import { COLUMN_WIDTH, INTERNET_TRAFFIC_LEADER_BOARD } from "./constants";
import ListItemComponent from "./ListItemComponent/ListItemComnponent";

const AnimatedList = () => {
  const [items, setItems] = useState(INTERNET_TRAFFIC_LEADER_BOARD);

  const shuffleItems = () => {
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
    <Box p={2}>
      <Stack direction="row" spacing={2} mb={2}>
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
        <FlipMove duration={750} easing="ease-in-out">
          <List>
            {items.map((item, index) => (
              <ListItemComponent
                key={index}
                item={item}
                columnWidths={COLUMN_WIDTH}
                isHeader={false}
              />
            ))}
          </List>
        </FlipMove>
      </Box>
    </Box>
  );
};

export default AnimatedList;
