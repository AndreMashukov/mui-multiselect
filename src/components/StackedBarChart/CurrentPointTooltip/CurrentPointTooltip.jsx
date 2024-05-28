import { Box,  Grid, Tooltip, Typography } from "@mui/material";
import PropTypes from "prop-types";

export const CurrentPointTooltip = ({ children, currentPoint }) => {
  return (
    <Tooltip
      title={
        <Box>
          {currentPoint && (
            <>
              <Grid
                container
                flexDirection="column"
                justifyContent="flex-start"
              >
                <Grid item>
                  <Typography variant="body2" color="text.secondary">
                    Name: {currentPoint.name}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body2" color="text.secondary">
                    Value: {currentPoint.value}
                  </Typography>
                </Grid>
              </Grid>
            </>
          )}
        </Box>
      }
      followCursor
      sx={{ backgroundColor: "white" }}
    >
      <Box>{children}</Box>
    </Tooltip>
  );
};

CurrentPointTooltip.propTypes = {
  children: PropTypes.node.isRequired,
  currentPoint: PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
  }),
};
