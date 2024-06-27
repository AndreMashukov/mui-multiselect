import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  Divider,
  Stack,
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
        <Stack>Top</Stack>
        <Divider />
        <Stack>Bottom</Stack>
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
