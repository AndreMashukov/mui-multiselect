import { useState } from "react";
import FlipMove from "react-flip-move";
import {
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { Shuffle } from "@mui/icons-material";
import { COLUMN_WIDTH, INTERNET_TRAFFIC_LEADER_BOARD } from "./constants";

const AnimatedList = () => {
  const [items, setItems] = useState(INTERNET_TRAFFIC_LEADER_BOARD);

  const shuffleItems = () => {
    const newItems = [...items];
    for (let i = newItems.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newItems[i], newItems[j]] = [newItems[j], newItems[i]];
    }
    // Update ranks to match the new order of items
    setItems(newItems.map((item, index) => ({ ...item, rank: index + 1 })));
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
        <ListItem
          divider
          sx={{
            position: "sticky",
            top: 0,
            backgroundColor: "white",
            zIndex: 100000,
          }}
        >
          <Stack direction="row" spacing={2} width="100%">
            <Typography variant="subtitle1" sx={{ width: COLUMN_WIDTH.rank }}>
              Rank
            </Typography>
            <Typography variant="subtitle1" sx={{ flex: 1 }}>
              Customer
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{ width: COLUMN_WIDTH.traffic }}
            >
              Traffic
            </Typography>
          </Stack>
        </ListItem>
      </List>
      <Box sx={{ height: "400px", overflowY: "auto" }}>
        <FlipMove duration={750} easing="ease-in-out">
          <List>
            {items.map((item) => (
              <ListItem key={item.customerId} divider>
                <ListItemText
                  primary={
                    <Stack
                      direction="row"
                      spacing={2}
                      alignItems="center"
                      width="100%"
                    >
                      <Typography
                        variant="body1"
                        sx={{ width: COLUMN_WIDTH.rank }}
                      >
                        {item.rank}
                      </Typography>
                      <Typography variant="body1" sx={{ flex: 1 }}>
                        {item.customerName}
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{ width: COLUMN_WIDTH.traffic }}
                      >
                        {item.traffic}
                      </Typography>
                    </Stack>
                  }
                />
              </ListItem>
            ))}
          </List>
        </FlipMove>
      </Box>
    </Box>
  );
};

export default AnimatedList;
