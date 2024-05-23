import {Box, IconButton} from "@mui/material";
import {styled} from "@mui/material/styles";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightTwoToneIcon from "@mui/icons-material/KeyboardArrowRightTwoTone";
import {PageContext} from "../../context/PageContext";
import {useContext} from "react";

const LeftDrawer = () => {
  const {state, actions} = useContext(PageContext);
  const {setOpen, setArrowActive} = actions;
  const {open, isArrowActive} = state;

  const drawerWidth = 310;

  const handleToggleDrawer = () => {
    localStorage.setItem("isOpenDrawer", !open);
    setOpen(!open);
    setArrowActive(!isArrowActive);
  };

  const StyledBox = styled(Box)({
    "& .IconButton": {
      background: "white",
      position: "fixed",
      zIndex: 10000,
      color: "#fc7b00",
      left: open ? drawerWidth - 20 : 47,
      top: "10%",
      // display: open ? "none" : "flex",
      display: "flex",
      filter: "drop-shadow(1px 2px 2px rgba(9, 30, 66, 0.08))",
      border: "1px solid #ddd",
      width: "30px",
      height: "30px",
    },
    "&:hover": {
      "& .IconButton": {
        color: "white",
        background: "#fc7b00",
      },
    },
  });

  return (
    <StyledBox>
      <IconButton
        data-cy="page-icon-button-31563"
        className="IconButton"
        onClick={handleToggleDrawer}
      >
        {open ? <KeyboardArrowLeftIcon /> : <KeyboardArrowRightTwoToneIcon />}
      </IconButton>
    </StyledBox>
  );
};

export default LeftDrawer;
