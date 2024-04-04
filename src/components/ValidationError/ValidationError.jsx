import { Typography } from "@mui/material";
import PropTypes from "prop-types";

const ValidationError = ({message}) => (
  <Typography
    variant="caption"
    sx={{
      color: "red",
      pt: 0,
      mt: 0,
      pb: 1,
    }}
  >
    {message}
  </Typography>
);

ValidationError.propTypes = {
  message: PropTypes.string.isRequired,
};

export default ValidationError;