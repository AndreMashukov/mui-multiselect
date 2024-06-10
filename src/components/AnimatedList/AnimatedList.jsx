import React, { useState } from "react";
import FlipMove from "react-flip-move";
import {
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Stack,
} from "@mui/material";
import { ArrowUpward, ArrowDownward, Shuffle } from "@mui/icons-material";

const AnimatedList = () => {
  const [items, setItems] = useState(["Item 1", "Item 2", "Item 3", "Item 4"]);

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
    setItems(newItems);
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
      <FlipMove duration={750} easing="ease-in-out">
        {items.map((item, index) => (
          <ListItem key={item} divider>
            <ListItemText primary={item} />
            <IconButton onClick={() => moveItemUp(index)} aria-label="move up">
              <ArrowUpward />
            </IconButton>
            <IconButton
              onClick={() => moveItemDown(index)}
              aria-label="move down"
            >
              <ArrowDownward />
            </IconButton>
          </ListItem>
        ))}
      </FlipMove>
    </Box>
  );
};

export default AnimatedList;
