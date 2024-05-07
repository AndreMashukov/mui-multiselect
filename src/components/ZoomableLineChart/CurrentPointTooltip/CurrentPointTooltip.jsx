import { Box, Divider, Grid, Tooltip, Typography } from "@mui/material";
import PropTypes from "prop-types";

export const CurrentPointTooltip = ({ children, currentPoint, colors }) => {
  return (
    <Tooltip
      title={
        <Box>
          {currentPoint && (
            <>
              <Typography variant="body2" color="text.secondary">
                {currentPoint.date}
              </Typography>
              <Divider sx={{ mb: 1 }} />
              {currentPoint.values.map((value, index) => (
                <Grid container justifyContent="flex-start" key={index}>
                  <Grid item>
                    <Box
                      component="span"
                      sx={{
                        width: 10,
                        height: 10,
                        borderRadius: "50%",
                        backgroundColor: colors[index],
                        display: "inline-block",
                        marginRight: 1,
                      }}
                    />
                  </Grid>
                  <Grid item>
                    <Typography
                      key={index}
                      variant="body2"
                      color="text.secondary"
                    >
                      {value}
                    </Typography>
                  </Grid>
                </Grid>
              ))}
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
    date: PropTypes.string.isRequired,
    values: PropTypes.arrayOf(PropTypes.number).isRequired,
  }),
  colors: PropTypes.arrayOf(PropTypes.string).isRequired,
};