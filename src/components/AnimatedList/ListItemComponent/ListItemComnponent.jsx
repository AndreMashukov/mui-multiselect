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
              }}
            >
              {isHeader ? "Rank" : item.rank}
              {!isHeader && renderRankChangeIcon(item.rankChangeDirection)}
            </Typography>
            <Typography
              variant={isHeader ? "subtitle1" : "body1"}
              sx={{ flex: 1 }}
            >
              {isHeader ? "Customer" : item.customerName}
            </Typography>
            <Typography
              variant={isHeader ? "subtitle1" : "body1"}
              sx={{ width: columnWidths.traffic }}
            >
              {isHeader ? "Traffic" : item.traffic}
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
    rankChangeDirection: PropTypes.string, // <- Added rankChangeDirection prop type
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
