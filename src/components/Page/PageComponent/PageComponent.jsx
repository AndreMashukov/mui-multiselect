import {useEffect, useLayoutEffect, useContext} from "react";

import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";

import {Header} from "./Header/Header.jsx";
import {PageContext} from "../context/PageContext.js";
import {Main} from "./Main/Main.jsx";
import PageContent from "./PageContent/PageContent.jsx";
import LeftDrawer from "./LeftDrawer/LeftDrawer.jsx";
import useGetDevice from "../../../hooks/useGetDevice.js";

const PageComponent = (props) => {
  let hideRightSidebar = "";
  const title = props.title || "Dashboard";

  const {state, actions} = useContext(PageContext);
  const {setOpen, setOpenRightDrawer, setArrowActive} = actions;
  const {open, isArrowActive} = state;

  const {isMobile} = useGetDevice();

  useLayoutEffect(() => {
    let openDrawerStatus = JSON.parse(localStorage.getItem("isOpenDrawer"));
    let isOpenDrawer = openDrawerStatus == null ? true : openDrawerStatus;
    setOpen(isOpenDrawer);
    setArrowActive(isOpenDrawer);
    let openRightDrawerStatus = JSON.parse(
      localStorage.getItem("isOpenRightDrawer")
    );
    let isOpenRightDrawer =
      openRightDrawerStatus == null ? true : openRightDrawerStatus;
    setOpenRightDrawer(isOpenRightDrawer);
  }, []);
  const handleToggleDrawer = () => {
    localStorage.setItem("isOpenDrawer", !open);
    setOpen(!open);
    setArrowActive(!isArrowActive);
  };

  hideRightSidebar = false;


  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        handleToggleDrawer();
      }
    };
    handleResize(); // Check on initial render

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);


  return (
    <>
      <Box
        sx={{
          background: "whitesmoke",
        }}
      >
        <CssBaseline />
        {!isMobile && (
          <>
            <Header open={open} />
            <LeftDrawer />
            <Main>
              <Toolbar />
              <PageContent title={title}>{props.children}</PageContent>
            </Main>
          </>
        )}
      </Box>
    </>
  );
};
export default PageComponent;
