/* eslint-disable react/prop-types */
import PropTypes from "prop-types";
import { Grid, ListItemText, SvgIcon } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import useGetDevice from "../../hooks/useGetDevice";

const CustomIcon = (props) => (
  <SvgIcon {...props}>
    <path d="M7 10l5 5 5-5z" fill="white" />
  </SvgIcon>
);
export default function CustomSelect({
  value,
  handleChange,
  options,
  sx,
  icon,
  replaceChevron,
  disabled,
  maxCharLength,
  placeholder,
}) {
  const { isMobile } = useGetDevice();
  return (
    <Select
      sx={sx}
      value={value}
      disabled={disabled}
      onChange={(e) => handleChange(e.target.value)}
      IconComponent={replaceChevron ? CustomIcon : undefined}
      displayEmpty // Ensure placeholder is displayed when value is empty
      renderValue={(selectedValue) => {
        if (!selectedValue) {
          // Return placeholder when value is null
          return <em>{placeholder}</em>;
        }
        const selectedOption = options.find(
          (option) => option.id === selectedValue.toString()
        );
        if (!selectedOption) {
          return <em>{placeholder}</em>; // Return placeholder if no option matches the value
        }
        return (
          <Grid
            container
            justifyContent="flex-start"
            alignItems="center"
            wrap="noWrap"
          >
            <Grid item>{icon}</Grid>
            <Grid
              item
              sx={{ position: "relative", width: `${maxCharLength || "30ch"}` }}
            >
              <ListItemText
                primary={selectedOption.label}
                sx={{
                  pl: 1,
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  position: "relative",
                  zIndex: 1,
                }}
              />
              {isMobile && selectedOption.label.length > 24 && (
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    bottom: 0,
                    width: "30%",
                    backgroundImage:
                      "linear-gradient(to right, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1) 75%)",
                    zIndex: 2,
                  }}
                />
              )}
            </Grid>
          </Grid>
        );
      }}
    >
      {options.map((option) => (
        <MenuItem key={option.id} value={option.id}>
          <Grid container justifyContent="flex-start" alignItems="center">
            <Grid item>{icon}</Grid>
            <Grid item>
              <ListItemText primary={option.label} sx={{ pl: 1 }} />
            </Grid>
          </Grid>
        </MenuItem>
      ))}
    </Select>
  );
}
CustomSelect.propTypes = {
  value: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  sx: PropTypes.object,
  icon: PropTypes.node,
  replaceChevron: PropTypes.bool,
  disabled: PropTypes.bool,
  maxCharLength: PropTypes.number,
  placeholder: PropTypes.string,
};
