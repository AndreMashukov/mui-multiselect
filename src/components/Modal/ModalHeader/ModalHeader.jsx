import DialogTitle from "@mui/material/DialogTitle";
import { BACKGROUND_COLOR } from "../StyledDialog.styled";
import { Divider, Grid, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import useGetDevice from "../../../hooks/useGetDevice";

const ModalHeader = ({title, handleCloseModal, showCloseButton}) => {
  const {isMobile} = useGetDevice();
  return (
    <>
      <DialogTitle sx={{backgroundColor: BACKGROUND_COLOR}}>
        <Grid container justifyContent="center" alignItems="center">
          <Typography variant="h4" color="secondary">
            {title}
          </Typography>
        </Grid>
      </DialogTitle>
      <Divider sx={{borderWidth: "2px", borderColor: "darkgrey"}} />
      {(isMobile || showCloseButton ) && (
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
