import PropTypes from "prop-types";
import {
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";

const ListItemComponent = ({
  key,
  item,
  columnWidths,
  isHeader,
}) => (
  <ListItem divider key={key}>
    <ListItemText
      primary={
        <Stack direction="row" spacing={2} alignItems="center" width="100%">
          <Typography
            variant={isHeader ? "subtitle1" : "body1"}
            sx={{ width: columnWidths.rank }}
          >
            {isHeader ? "Rank" : item.rank}
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

ListItemComponent.propTypes = {
  key: PropTypes.string.isRequired,
  item: PropTypes.shape({
    customerId: PropTypes.string,
    rank: PropTypes.number,
    customerName: PropTypes.string,
    traffic: PropTypes.string,
  }),
  index: PropTypes.number,
  columnWidths: PropTypes.shape({
    rank: PropTypes.string.isRequired,
    traffic: PropTypes.string.isRequired,
  }).isRequired,
  isHeader: PropTypes.bool,
};

ListItemComponent.defaultProps = {
  item: {
    customerId: "",
    rank: 0,
    customerName: "",
    traffic: 0,
  },
  index: 0,
  isHeader: false,
};

export default ListItemComponent;
