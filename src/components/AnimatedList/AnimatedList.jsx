import React, { useState } from "react";
import FlipMove from "react-flip-move";

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
    <div>
      <button onClick={shuffleItems}>Shuffle</button>
      <FlipMove duration={750} easing="ease-in-out">
        {items.map((item, index) => (
          <div key={item}>
            <span>{item}</span>
            <button onClick={() => moveItemUp(index)}>Up</button>
            <button onClick={() => moveItemDown(index)}>Down</button>
          </div>
        ))}
      </FlipMove>
    </div>
  );
};

export default AnimatedList;
