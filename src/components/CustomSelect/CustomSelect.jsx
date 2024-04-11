/* eslint-disable react/prop-types */
import React from "react";
import {Grid, ListItemText, SvgIcon} from "@mui/material";
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
}) {
  const {isMobile} = useGetDevice();
  return (
    <Select
      sx={sx}
      value={value}
      disabled={disabled}
      onChange={(e) => handleChange(e.target.value)}
      IconComponent={replaceChevron ? CustomIcon : undefined}
      renderValue={(selectedValue) => {
        const selectedOption = options.find(
          (option) => option.id === selectedValue.toString()
        );
        if (!selectedOption) {
          return "";
        }
        return (
          <Grid container justifyContent="flex-start" alignItems="center" wrap="nowrap">
            <Grid item>{icon}</Grid>
            <Grid item sx={{position: "relative", width: `${maxCharLength || "25"}ch`}}>
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
              <ListItemText primary={option.label} sx={{pl: 1}} />
            </Grid>
          </Grid>
        </MenuItem>
      ))}
    </Select>
  );
}
