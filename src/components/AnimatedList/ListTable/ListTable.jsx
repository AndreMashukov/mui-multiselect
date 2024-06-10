import PropTypes from "prop-types";
import {
  ListItem,
  ListItemText,
  Stack,
  Typography,
  IconButton,
  Box,
} from "@mui/material";
import { ArrowUpward, ArrowDownward } from "@mui/icons-material";

const ListItemComponent = ({ item, index, columnWidths, moveItemUp, moveItemDown }) => (
  <ListItem key={item.customerId} divider>
    <ListItemText
      primary={
        <Stack direction="row" spacing={2} alignItems="center" width="100%">
          <Typography variant="body1" sx={{ width: columnWidths.rank }}>
            {item.rank}
          </Typography>
          <Typography variant="body1" sx={{ flex: 1 }}>
            {item.customerName}
          </Typography>
          <Typography variant="body1" sx={{ width: columnWidths.traffic }}>
            {item.traffic}
          </Typography>
          <Stack
            direction="row"
            spacing={1}
            sx={{ width: columnWidths.actions }}
          >
            <IconButton onClick={() => moveItemUp(index)} aria-label="move up">
              <ArrowUpward />
            </IconButton>
            <IconButton
              onClick={() => moveItemDown(index)}
              aria-label="move down"
            >
              <ArrowDownward />
            </IconButton>
          </Stack>
        </Stack>
      }
    />
  </ListItem>
);

ListItemComponent.propTypes = {
  item: PropTypes.shape({
    customerId: PropTypes.string.isRequired,
    rank: PropTypes.number.isRequired,
    customerName: PropTypes.string.isRequired,
    traffic: PropTypes.number.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
  columnWidths: PropTypes.shape({
    rank: PropTypes.string.isRequired,
    traffic: PropTypes.string.isRequired,
    actions: PropTypes.string,
  }).isRequired,
};

export default ListItemComponent;
