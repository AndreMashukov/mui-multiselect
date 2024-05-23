import {Box, Container, Grid, Typography} from "@mui/material";
import {useTranslation} from "react-i18next";
import useGetDevice from "../../../../hooks/useGetDevice";

const PageContent = ({title, children}) => {
  const {t} = useTranslation();
  const hideRightSidebar = false

  const {isMobile} = useGetDevice();
  return (
    <Container
      maxWidth="bg"
      sx={{
        padding: `${isMobile ? "15px" : "10px"} 0px 0px 0px`,
      }}
    >
      <Grid
        container
        flexDirection="row"
        justifyContent="space-between"
        alignContent="baseline"
      >
        <Grid item>
          <Typography
            data-cy="page-typography-63464"
            variant="h5"
            gutterBottom
            sx={{fontWeight: "bold", pl: "5px"}}
          >
            {title}
          </Typography>
        </Grid>
        <Grid item></Grid>
      </Grid>

      <Box
        sx={{
          bgcolor: "white",
          padding: isMobile
            ? "25px 0px 0px 0px"
            : hideRightSidebar
            ? "0px"
            : "25px",
          borderRadius: "8px",
          boxShadow: 2,
          marginBottom: "15px",
          height: "100%",
        }}
      >
        {children}
      </Box>
    </Container>
  );
};

export default PageContent;
