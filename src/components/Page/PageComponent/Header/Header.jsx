import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Box, Grid, Divider } from "@mui/material";

import { AppBarDesktop } from "./Header.styled.js";
import useGetDevice from "../../../../hooks/useGetDevice.js";

const VerticalDivider = () => (
  <Box display="flex" alignItems="center" sx={{ mx: 2 }}>
    <Divider
      orientation="vertical"
      sx={{ bgcolor: "grey.100", height: "25px", width: "2px" }}
    />
  </Box>
);

const Header = ({ open }) => {
  const { isMobile } = useGetDevice();

  return (
    <>
      {!isMobile && (
        <AppBarDesktop position="fixed" open={open} elevation={2}>
          <Toolbar>
            <Box sx={{ flexGrow: 3 }}>
              <Typography variant="h6" noWrap sx={{ fontWeight: "600" }}>
                Digital Edge Customer Portal
              </Typography>
            </Box>
            <Box>
              <Grid container alignItems="center">
                <Grid item sx={{ minWidth: "200px", width: "290px" }}>
                  {/* {defaultCompany && defaultCompany[0] && <CompanySelect />} */}
                </Grid>
                <Grid item>
                  <VerticalDivider />
                </Grid>
                <Grid item sx={{ width: "150px" }}>
                  {/* <CountrySelect /> */}
                </Grid>
                <Grid item>
                  <VerticalDivider />
                </Grid>
                <Grid item></Grid>
                <Grid item></Grid>
                <Grid item></Grid>
                <Grid item sx={{ marginLeft: "12px" }}></Grid>
              </Grid>
            </Box>
          </Toolbar>
        </AppBarDesktop>
      )}
    </>
  );
};

export { Header };
