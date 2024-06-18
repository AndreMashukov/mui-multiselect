import { Dialog, styled } from "@mui/material";

export const BACKGROUND_COLOR = "rgba(240,240,240,1)";

export const StyledDialog = styled(Dialog)(({theme}) => ({
  "& .MuiDialogContent-root": {
    backgroundColor: BACKGROUND_COLOR,
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
    justifyContent: "flex-end",
  },
}));
