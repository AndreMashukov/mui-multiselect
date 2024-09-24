import React from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Box,
  Stack,
  Divider,
} from "@mui/material";
import useDoughnutChart, {BASE_COLORS} from "./hooks/useDoughnutChart";

const DoughnutCard = ({graphData, title}) => {
  const {chartRef, cardContentRef, centerBoxRef, showCenterContent} =
    useDoughnutChart(graphData);

  return (
    <Card sx={{height: "100%", minWidth: "200px"}}>
      <CardHeader
        sx={{padding: "8px 16px"}}
        title={
          <Stack
            direction="row"
            justifyContent="space-between"
            alignContent="flex-end"
          >
            <Typography
              sx={{
                fontWeight: "bold",
                mr: 2,
                flexShrink: 1,
                whiteSpace: "nowrap",
              }}
              variant="h5"
            >
              {title}
            </Typography>
            <Stack direction="row" gap={2}>
              {graphData.types.map((type, i) => (
                <Box
                  key={i}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <Box
                    sx={{
                      width: 12,
                      height: 12,
                      backgroundColor: BASE_COLORS[i % BASE_COLORS.length],
                    }}
                  />
                  <Typography
                    sx={{
                      flexShrink: 1,
                      whiteSpace: "nowrap",
                    }}
                    variant="body2"
                  >
                    {type.title}
                  </Typography>
                </Box>
              ))}
            </Stack>
          </Stack>
        }
      />
      <Divider />
      <CardContent
        ref={cardContentRef}
        sx={{
          height: "100%",
          width: "100%",
          position: "relative",
          p: 0,
          pb: "0px !important",
        }}
      >
        <Box sx={{height: "100%", width: "100%", p: 0}}>
          <svg ref={chartRef}></svg>
        </Box>
        {showCenterContent && (
          <Box
            ref={centerBoxRef}
            sx={{
              position: "absolute",
              top: "70%",
              left: "49.7%",
              transform: "translate(-50%, -50%)",
              textAlign: "center",
            }}
          >
            <Typography
              sx={{
                fontWeight: "bold",
              }}
              variant="h4"
            >
              {graphData.totalNumber}
            </Typography>
            <Typography
              sx={{
                fontWeight: "bold",
                flexShrink: 1,
                whiteSpace: "nowrap",
              }}
              variant="h6"
            >
              {title}
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

DoughnutCard.propTypes = {
  graphData: PropTypes.shape({
    types: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
      })
    ).isRequired,
    graph: PropTypes.arrayOf(PropTypes.number).isRequired,
    totalNumber: PropTypes.number.isRequired,
  }).isRequired,
  title: PropTypes.string.isRequired,
};

export default DoughnutCard;
