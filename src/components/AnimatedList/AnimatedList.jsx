import { useState } from "react";
import FlipMove from "react-flip-move";
import {
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { ArrowUpward, ArrowDownward, Shuffle } from "@mui/icons-material";

const INTERNET_TRAFFIC_LEADER_BOARD = [
  {
    customerId: "cust1",
    customerName: "Golden Lucky Telecom",
    rank: 1,
    traffic: "3.40G",
  },
  {
    customerId: "cust2",
    customerName: "Silver Star Networks",
    rank: 2,
    traffic: "2.90G",
  },
  {
    customerId: "cust3",
    customerName: "Pacific Link Communications",
    rank: 3,
    traffic: "2.70G",
  },
  {
    customerId: "cust4",
    customerName: "Global Internet Services",
    rank: 4,
    traffic: "2.50G",
  },
  {
    customerId: "cust5",
    customerName: "Digital Dragon Solutions",
    rank: 5,
    traffic: "2.20G",
  },
  {
    customerId: "cust6",
    customerName: "Broadband Tiger Co.",
    rank: 6,
    traffic: "2.10G",
  },
];

const columnWidths = {
  rank: "50px",
  customer: "flex",
  traffic: "100px",
  actions: "100px",
};

const AnimatedList = () => {
  const [items, setItems] = useState(INTERNET_TRAFFIC_LEADER_BOARD);

  const moveItemUp = (index) => {
    if (index === 0) return;
    const newItems = [...items];
    [newItems[index - 1], newItems[index]] = [
      newItems[index],
      newItems[index - 1],
    ];
    setItems(newItems);
  };

  const moveItemDown = (index) => {
    if (index === items.length - 1) return;
    const newItems = [...items];
    [newItems[index], newItems[index + 1]] = [
      newItems[index + 1],
      newItems[index],
    ];
    setItems(newItems);
  };

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
      <List>
        {/* Header Row */}
        <ListItem divider>
          <Stack direction="row" spacing={2} width="100%">
            <Typography variant="subtitle1" sx={{ width: columnWidths.rank }}>
              Rank
            </Typography>
            <Typography variant="subtitle1" sx={{ flex: 1 }}>
              Customer
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{ width: columnWidths.traffic }}
            >
              Traffic
            </Typography>
            <Box sx={{ width: columnWidths.actions }} />{" "}
            {/* For spacing actions */}
          </Stack>
        </ListItem>
      </List>
      <FlipMove duration={750} easing="ease-in-out">
        <List>
          {items.map((item, index) => (
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
                      sx={{ width: columnWidths.rank }}
                    >
                      {item.rank}
                    </Typography>
                    <Typography variant="body1" sx={{ flex: 1 }}>
                      {item.customerName}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ width: columnWidths.traffic }}
                    >
                      {item.traffic}
                    </Typography>
                    <Stack
                      direction="row"
                      spacing={1}
                      sx={{ width: columnWidths.actions }}
                    >
                      <IconButton
                        onClick={() => moveItemUp(index)}
                        aria-label="move up"
                      >
                        <ArrowUpward />
                      </IconButton>
                      <IconButton
                        onClick={() => moveItemDown(index)}
                        aria-label="move down"
                      >
                        <ArrowDownward />
                      </IconButton>
                    </Stack>
                  </Stack>
                }
              />
            </ListItem>
          ))}
        </List>
      </FlipMove>
    </Box>
  );
};

export default AnimatedList;
