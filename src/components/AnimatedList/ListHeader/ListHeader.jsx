import PropTypes from "prop-types";
import { ListItem, Stack, Typography, Box } from "@mui/material";

const ListHeader = ({ columnWidths }) => (
  <ListItem divider>
    <Stack direction="row" spacing={2} width="100%">
      <Typography variant="subtitle1" sx={{ width: columnWidths.rank }}>
        Rank
      </Typography>
      <Typography variant="subtitle1" sx={{ flex: 1 }}>
        Customer
      </Typography>
      <Typography variant="subtitle1" sx={{ width: columnWidths.traffic }}>
        Traffic
      </Typography>
      <Box sx={{ width: columnWidths.actions }} /> {/* For spacing actions */}
    </Stack>
  </ListItem>
);

ListHeader.propTypes = {
  columnWidths: PropTypes.shape({
    rank: PropTypes.string.isRequired,
    traffic: PropTypes.string.isRequired,
    actions: PropTypes.string,
  }).isRequired,
}

export default ListHeader;
