import { Stack } from "@mui/material";
import { StyledButton } from "./SelectorSecondary.styled.js";
import PropTypes from "prop-types";

const SelectorSecondary = ({
  options,
  setSelectedOption,
  selectedOption,
  extraStyles,
}) => {
  const changeOption = (dataId) => {
    setSelectedOption(dataId);
  };

  const buttons = options.map((option) => (
    <StyledButton
      key={`selector-secondary-${option.id}`}
      onClick={() => {
        changeOption(option.id);
      }}
      type={selectedOption === option.id ? "selected" : "basic"}
      variant="text"
    >
      {option.label}
    </StyledButton>
  ));

  return (
    <Stack
      data-cy="selector-secondary-17493"
      direction="row"
      spacing={1}
      sx={extraStyles}
    >
      {buttons}
    </Stack>
  );
};

SelectorSecondary.propTypes = {
  extraStyles: PropTypes.object,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      label: PropTypes.string,
    })
  ).isRequired,
  selectedOption: PropTypes.string.isRequired,
  setSelectedOption: PropTypes.func.isRequired,
};

export default SelectorSecondary;
