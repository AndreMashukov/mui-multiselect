/* eslint-disable react/prop-types */
import { Menu } from "@mui/material";

const ThreeDotsMenu = ({ anchorEl, open, handleClose }) => {
  return (
    <Menu
      id={"long-menu"}
      MenuListProps={{
        "aria-labelledby": "long-button",
      }}
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{ horizontal: "left", vertical: "top" }}
    >
      Three Dots Menu
    </Menu>
  );
};

export default ThreeDotsMenu;
