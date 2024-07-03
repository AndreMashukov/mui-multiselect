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
import PropTypes from "prop-types";

const PreferenceModalContainer = ({
  showModal,
  setShowModal,
  isMobile,
  countries,
  companies,
}) => {
  const { actions } = useContext(PreferenceModalContext);
  const { handleUpdateClick } = actions;
  return (
    <StyledDialog
      open={showModal}
      onClose={() => setShowModal(false)}
      fullScreen={isMobile}
    >
      <ModalHeader
        title="Preference"
        handleCloseModal={() => setShowModal(false)}
        showCloseButton={isMobile}
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
            <PreferenceModalTopPart
              countries={countries}
              companies={companies}
            />
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
          <PreferenceModalBottomPart isMobile={isMobile} />
        </Stack>
      </DialogContent>
      <DialogActions sx={{ position: "relative" }}>
        <Box justifyContent="flex-end">
          <Button
            onClick={() => {
              handleUpdateClick();
              setShowModal(false);
            }}
            sx={{ mr: 1 }}
          >
            Update
          </Button>
          <Button onClick={() => setShowModal(false)}>Close</Button>
        </Box>
      </DialogActions>
    </StyledDialog>
  );
};

export default PreferenceModalContainer;

PreferenceModalContainer.propTypes = {
  showModal: PropTypes.bool.isRequired,
  setShowModal: PropTypes.func.isRequired,
  isMobile: PropTypes.bool,
  countries: PropTypes.array.isRequired,
  companies: PropTypes.array.isRequired,
};
