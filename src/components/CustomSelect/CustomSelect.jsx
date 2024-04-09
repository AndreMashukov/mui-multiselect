/* eslint-disable react/prop-types */
import React from "react";
import { Grid, ListItemText, SvgIcon } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

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
}) {
  return (
    <Select
      sx={sx}
      value={value}
      // onChange={handleChange}
      IconComponent={replaceChevron && CustomIcon}
    >
      {options &&
        options.length &&
        options.map((option) => (
          <MenuItem
            key={option.id}
            value={option.id}
            onClick={() => {
              handleChange(option.id);
            }}
          >
            <Grid container justifyContent="flex-start" alignItems="center">
              {icon}
              <ListItemText primary={option.label} sx={{ pl: 1 }} />
            </Grid>
          </MenuItem>
        ))}
    </Select>
  );
}
