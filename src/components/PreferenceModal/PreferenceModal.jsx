import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import ModalHeader from "../Modal/ModalHeader/ModalHeader";
import { StyledDialog } from "../Modal/StyledDialog.styled";

const PreferenceModal = ({ showHideColumnsModal, setShowHideColumnsModal }) => {
  return (
    <StyledDialog
      open={showHideColumnsModal}
      onClose={() => setShowHideColumnsModal(false)}
    >
      <ModalHeader
        title="Preference"
        handleCloseModal={() => setShowHideColumnsModal(false)}
      />

      <DialogContent>
        <Stack sx={{ mb: 2 }}>
          <Stack justifyContent="flex-start">
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
              }}
            >
              Default Country and Company
            </Typography>
          </Stack>
          <Stack sx={{ ml: 5 }}>
            <Typography variant="body1">Country: United States</Typography>
            <Typography variant="body1">Company: Apple</Typography>
          </Stack>
        </Stack>
        <Divider />
        <Stack sx={{ mt: 2 }}>
          <Stack justifyContent="flex-start">
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
              }}
            >
              Current Layout
            </Typography>
          </Stack>
        </Stack>
      </DialogContent>
      <DialogActions sx={{ position: "relative" }}>
        <Box justifyContent="flex-end">
          <Button onClick={() => setShowHideColumnsModal(false)}>Close</Button>
        </Box>
      </DialogActions>
    </StyledDialog>
  );
};

export default PreferenceModal;
