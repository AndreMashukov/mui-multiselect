/* eslint-disable react/prop-types */
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

export const CustomDateTimePicker = ({
  label,
  value,
  handleChange,
  errorMessage,
}) => {
  return (
    <DateTimePicker
      label={label}
      value={value}
      onChange={handleChange}
      format="DD/MM/YYYY HH:mm"
      slotProps={{
        textField: {
          // InputProps: {
          //   startAdornment: <AccessTimeIcon />,
          // },
          error: errorMessage || false,
          helperText: errorMessage,
        },
      }}
    />
  );
};
