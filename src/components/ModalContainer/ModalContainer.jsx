import * as React from "react";
import {styled} from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import {useTranslation} from "react-i18next";
import {
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
// import useGetDevice from "../hooks/ui/useGetDevice.js";

export default function ModalContainer({title, open, setOpen, children}) {
  const {t} = useTranslation();
  const isMobile = false;

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div data-cy="CustomDialog-div-35164">
      <Dialog
        // ismobile={isMobile}
        fullScreen={isMobile}
        onClose={handleClose}
        aria-labelledby={title}
        open={open}
      >
        <DialogTitle>
          <Grid container justifyContent="center" alignItems="center">
            <Typography variant="h5" color="primary" gutterBottom>
              {title}
            </Typography>
          </Grid>
        </DialogTitle>
        <Divider />
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent>{children}</DialogContent>
      </Dialog>
    </div>
  );
}
