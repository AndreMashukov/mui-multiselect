import * as React from "react";
import { MultiInputDateTimeRangeField } from "@mui/x-date-pickers-pro/MultiInputDateTimeRangeField";
import moment from "moment";

// eslint-disable-next-line react/prop-types
export default function CustomRangePicker({ startDateLabel, endDateLabel }) {
  const [value, setValue] = React.useState(() => [
    moment("2022-04-17T15:30"),
    moment("2022-04-21T18:30"),
  ]);

  const onChange = (newValue) => {
    console.log(newValue);
    setValue(newValue);
  };

  return (
    <MultiInputDateTimeRangeField
      format="DD/MM/YYYY HH:mm"
      value={value}
      onChange={onChange}
      slotProps={{
        textField: ({ position }) => ({
          label: position === "start" ? startDateLabel : endDateLabel,
        }),
      }}
    />
  );
}
