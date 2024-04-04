import {Button, styled} from "@mui/material";

export const StyledButton = styled(Button)(({theme, type}) => {
  const basic = {
    color: "black",
    backgroundColor: "white",
    borderColor: "lightgrey",
    textTransform: "lowercase",
    fontWeight: "500 !important",
    borderRadius: "5px !important",
    "&:hover": {
      backgroundColor: "lightgrey",
      color: "black",
    },
  };

  const selected = {
    color: "black",
    backgroundColor: "lightgrey",
    borderColor: "lightgrey",
    textTransform: "lowercase",
    fontWeight: "500 !important",
    borderRadius: "5px !important",
    "&:hover": {
      backgroundColor: "lightgrey",
    },
  };

  return type === "selected" ? selected : basic;
});
