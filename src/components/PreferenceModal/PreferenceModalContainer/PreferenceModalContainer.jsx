import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import ModalHeader from "../../Modal/ModalHeader/ModalHeader";
import { StyledDialog } from "../../Modal/StyledDialog.styled";
import { PreferenceModalTopPart } from "./PreferenceModalTopPart/PreferenceModalTopPart";
import { PreferenceModalBottomPart } from "./PreferenceModalBottomPart/PreferenceModalBottomPart";
import { useContext } from "react";
import { PreferenceModalContext } from "../context/PreferenceModalContext";

const PreferenceModalContainer = ({ showModal, setShowModal }) => {
  const {actions} = useContext(PreferenceModalContext);
  const { handleUpdateClick } = actions
  return (
    <StyledDialog open={showModal} onClose={() => setShowModal(false)}>
      <ModalHeader
        title="Preference"
        handleCloseModal={() => setShowModal(false)}
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
            <PreferenceModalTopPart />
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
          <PreferenceModalBottomPart />
        </Stack>
      </DialogContent>
      <DialogActions sx={{ position: "relative" }}>
        <Box justifyContent="flex-end">
          <Button onClick={() => {
            handleUpdateClick();
            setShowModal(false);
          }} sx={{ mr: 1 }}>
            Update
          </Button>
          <Button onClick={() => setShowModal(false)}>Close</Button>
        </Box>
      </DialogActions>
    </StyledDialog>
  );
};

export default PreferenceModalContainer;
