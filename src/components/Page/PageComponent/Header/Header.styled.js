import {IconButton, styled} from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";

const drawerWidth = 300;

export const AppBarDesktop = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({theme, open}) => ({
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  color: "white",
  marginLeft: drawerWidth,
  width: `calc(100% - (${theme.spacing(7)} + 1px))`,
  ...(open && {
    marginLeft: `calc(${theme.spacing(7)} + 1px)`,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
  background: theme.palette.secondary.main,
  mb: 1,
}));

export const AppBarMobile = styled(MuiAppBar)(({theme}) => ({
  background: theme.palette.secondary.main,
  color: "white",
}));

export const RightMenuIconButton = styled(IconButton)(({theme}) => ({
  background: "white",
  position: "absolute",
  top: "45px",
  right: "5%",
  "&:hover": {
    color: "white",
    background: theme.palette.primary.main,
  },
}));
