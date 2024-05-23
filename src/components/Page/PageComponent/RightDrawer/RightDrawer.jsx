import * as React from "react";
import Box from "@mui/material/Box";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightTwoToneIcon from "@mui/icons-material/KeyboardArrowRightTwoTone";
// import {drawerWidth} from "../../../frontend-helpers";
import MuiDrawer from "@mui/material/Drawer";
import {styled} from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import { PageContext } from "../../context/PageContext";

const drawerWidth = 300;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  [theme.breakpoints.down("sm")]: {
    width: 290, // Width for screens larger than or equal to small breakpoint (sm)
  },
  height: "fit-content",
  overflowX: "hidden",
});
const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  height: "fit-content",
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});
const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({theme, open}) => ({
  width: drawerWidth,
  flexShrink: 0,
  borderRadius: "17px",
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
    borderRadius: "17px",
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
    borderRadius: "17px",
  }),
  // [theme.breakpoints.up("sm")]: {
  //   width: 240, // Width for screens larger than or equal to small breakpoint (sm)
  // },
  // [theme.breakpoints.down("xs")]: {
  //   width: "100%", // Width for screens smaller than extra small breakpoint (xs)
  // },
}));

const DrawerHeader = styled("div")(({theme}) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "left",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

export default function PermanentDrawerRight() {
  const {actions} = React.useContext(PageContext);
  const {setOpenRightDrawer: setIsOpenRightDrawer} = actions;
  const [isOpenRightDrawer, setOpenRightDrawer] = React.useState(true);
  const [isArrowActive, setArrowActive] = React.useState(false);
  React.useLayoutEffect(() => {
    let openDrawerStatus = JSON.parse(
      localStorage.getItem("isOpenRightDrawer")
    );
    let isOpenDrawer = openDrawerStatus == null ? true : openDrawerStatus;
    setOpenRightDrawer(isOpenDrawer);
    setArrowActive(!isOpenDrawer);
  }, []);

  const openCloseDrawer = () => {
    localStorage.setItem("isOpenRightDrawer", !isOpenRightDrawer);
    setOpenRightDrawer(!isOpenRightDrawer);
    setArrowActive(!isArrowActive);
    setIsOpenRightDrawer(!isOpenRightDrawer);
  };

  return (
    <>
      <Box
        sx={{
          height: "fit-content",
          background: "whitesmoke",
          zIndex: 1000,
          "& .MuiDrawer-paper": {
            background: "whitesmoke",
            boxSizing: "border-box",
            marginTop: "60px",
            border: "none",
            zIndex: 1000,
          },
        }}
      >
        <Drawer variant="permanent" anchor="right" open={isOpenRightDrawer}>
          <Box>
            <DrawerHeader>
              <IconButton
                data-cy="RightDrawer-icon-button-98778"
                sx={{
                  background: "white",
                  "&:hover": {
                    backgroundColor: "#fc7b00",
                    color: "white",
                  },
                }}
                onClick={openCloseDrawer}
              >
                {isArrowActive ? (
                  <KeyboardArrowLeftIcon />
                ) : (
                  <KeyboardArrowRightTwoToneIcon />
                )}
              </IconButton>
              <Box
                sx={{
                  display: isOpenRightDrawer ? "flex" : "none",
                  borderRadius: "8px",
                  marginRight: "8px",
                  marginLeft: "8px",
                  paddingLeft: "8px",
                  marginBottom: 1,
                  justifyContent: "flex-end",
                  textAlign: "center",
                  width: "100%",
                }}
              ></Box>
            </DrawerHeader>
          </Box>
          <Box
            sx={{
              display: "flex",
              backgroundColor: "white",
              borderRadius: "8px",
              marginRight: "8px",
              marginLeft: "8px",
              boxShadow: 1,
              marginBottom: 1,
            }}
          >
            Right Drawer
          </Box>
        </Drawer>
      </Box>
    </>
  );
}
