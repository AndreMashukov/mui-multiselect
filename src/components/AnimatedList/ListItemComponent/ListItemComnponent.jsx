import PropTypes from "prop-types";
import { ListItem, ListItemText, Stack, Typography } from "@mui/material";
import { ArrowUpward, ArrowDownward, Remove } from "@mui/icons-material";

const ListItemComponent = ({ key, item, columnWidths, isHeader }) => {
  const renderRankChangeIcon = (direction) => {
    if (direction === "up") {
      return <ArrowUpward color="success" />;
    } else if (direction === "down") {
      return <ArrowDownward color="error" />;
    } else {
      return <Remove />;
    }
  };

  const getExtraStyles = () => {
    if (isHeader) {
      return {
        position: "relative",
        left: "-15px",
      };
    }
    return {};
  };

  return (
    <ListItem divider key={key}>
      <ListItemText
        primary={
          <Stack direction="row" spacing={2} alignItems="center" width="100%">
            <Typography
              variant={isHeader ? "subtitle1" : "body1"}
              sx={{
                width: columnWidths.rank,
                display: "flex",
                alignItems: "center",
                fontWeight: isHeader ? "bold" : "normal",
              }}
            >
              {isHeader ? "Rank" : item.rank}
              {!isHeader && renderRankChangeIcon(item.rankChangeDirection)}
            </Typography>
            <Typography
              variant={isHeader ? "subtitle1" : "body1"}
              sx={{
                flex: 1,
                fontWeight: isHeader ? "bold" : "normal",
                minWidth: "100px",
              }}
            >
              {isHeader ? (
                "Customer"
              ) : item.customerName ? (
                item.customerName
              ) : (
                <div
                  style={{
                    height: "20px",
                    background: "linear-gradient(to right, darkgrey, lightgrey)",
                  }}
                />
              )}
            </Typography>
            <Typography
              variant={isHeader ? "subtitle1" : "body1"}
              sx={{
                width: columnWidths.traffic,
                fontWeight: isHeader ? "bold" : "normal",
                ...getExtraStyles(),
              }}
            >
              {isHeader ? "Traffic" : item.traffic}
            </Typography>
            <Typography
              variant={isHeader ? "subtitle1" : "body1"}
              sx={{
                width: columnWidths.gap,
                fontWeight: isHeader ? "bold" : "normal",
                ...getExtraStyles(),
              }}
            >
              {isHeader ? "Gap" : item.gap}
            </Typography>
          </Stack>
        }
      />
    </ListItem>
  );
};

ListItemComponent.propTypes = {
  key: PropTypes.string,
  item: PropTypes.shape({
    customerId: PropTypes.string,
    rank: PropTypes.number,
    customerName: PropTypes.string,
    traffic: PropTypes.string,
    rankChangeDirection: PropTypes.string,
    gap: PropTypes.string,
  }),
  columnWidths: PropTypes.shape({
    rank: PropTypes.string.isRequired,
    traffic: PropTypes.string.isRequired,
  }).isRequired,
  isHeader: PropTypes.bool,
};

ListItemComponent.defaultProps = {
  key: "",
  item: {
    customerId: "",
    rank: 0,
    customerName: "",
    traffic: 0,
    rankChangeDirection: "none", // <- Added default rankChangeDirection
  },
  isHeader: false,
};

export default ListItemComponent;
