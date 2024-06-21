import { Button, MenuItem, Select, Stack, Typography } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";

const StackTop = ({ refreshInterval, setRefreshInterval, shuffleItems }) => (
  <Stack
    direction="row"
    justifyContent="space-between"
    alignItems="flex-end"
    mb={1}
  >
    <Button
      startIcon={<RefreshIcon />}
      variant="contained"
      onClick={shuffleItems}
    >
      Refresh
    </Button>
    <Stack direction="row" spacing={1} alignItems="center">
      <Typography>Auto-refresh</Typography>
      <Select
        value={refreshInterval}
        onChange={(e) => setRefreshInterval(e.target.value)}
        variant="outlined"
        size="small"
      >
        <MenuItem value="stop">Stop</MenuItem>
        <MenuItem value="5">5min</MenuItem>
        <MenuItem value="10">10min</MenuItem>
        <MenuItem value="15">15min</MenuItem>
      </Select>
    </Stack>
  </Stack>
);

export default StackTop;
