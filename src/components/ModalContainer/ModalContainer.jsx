import * as React from "react";
import {styled} from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import {useTranslation} from "react-i18next";
import {DialogTitle, Divider, Grid, Stack, Typography} from "@mui/material";

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
        <DialogContent>{children}</DialogContent>
      </Dialog>
    </div>
  );
}
