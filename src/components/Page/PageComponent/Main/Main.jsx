import {styled} from "@mui/material/styles";
import {useContext, useMemo} from "react";
import { PageContext } from "../../context/PageContext";

const drawerWidth = 300;

const StyledMain = styled("main", {
  shouldForwardProp: (prop) => prop !== "open",
})(({theme, open, openrightdrawer}) => ({
  flexGrow: 1,
  width: "1100px",
  // padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  background: "whitesmoke",
  marginLeft: `calc(${theme.spacing(7)} + 1px)`,
  marginRight: openrightdrawer
    ? drawerWidth
    : `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.down("md")]: {
    marginRight: "0px",
  },
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: drawerWidth,
    marginRight: openrightdrawer
      ? drawerWidth
      : `calc(${theme.spacing(7)} + 1px)`,
  }),
}));

export const Main = (props) => {
  const {state} = useContext(PageContext);
  const {isOpenRightDrawer, open} = state;

  return useMemo(() => {
    return (
      <StyledMain open={open} openrightdrawer={isOpenRightDrawer}>
        {props.children}
      </StyledMain>
    );
  }, [isOpenRightDrawer, open]);
};
