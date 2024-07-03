import DialogTitle from "@mui/material/DialogTitle";
import { BACKGROUND_COLOR } from "../StyledDialog.styled";
import { Divider, Grid, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PropTypes from "prop-types";

const ModalHeader = ({
  title,
  handleCloseModal,
  showCloseButton,
  isMobile = false,
}) => {
  return (
    <>
      <DialogTitle sx={{ backgroundColor: BACKGROUND_COLOR }}>
        <Grid container justifyContent="center" alignItems="center">
          <Typography variant="h4" color="secondary">
            {title}
          </Typography>
        </Grid>
      </DialogTitle>
      <Divider sx={{ borderWidth: "2px", borderColor: "darkgrey" }} />
      {(isMobile || showCloseButton) && (
        <IconButton
          aria-label="close"
          onClick={handleCloseModal}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      )}
    </>
  );
};

export default ModalHeader;

ModalHeader.propTypes = {
  title: PropTypes.string.isRequired,
  handleCloseModal: PropTypes.func.isRequired,
  showCloseButton: PropTypes.bool,
  isMobile: PropTypes.bool,
};
