import { MultiInputDateTimeRangeField } from "@mui/x-date-pickers-pro/MultiInputDateTimeRangeField";

// eslint-disable-next-line react/prop-types
export default function CustomRangePicker({
  startDateLabel,
  endDateLabel,
  startDate,
  endDate,
  setStartDate,
  setEndDate,
  handleBlur,
}) {
  // const [value, setValue] = React.useState(() => [
  //   moment("2022-04-17T15:30"),
  //   moment("2022-04-21T18:30"),
  // ]);

  const onChange = (newValue) => {
    // console.log(newValue);
    setStartDate(newValue[0]);
    setEndDate(newValue[1]);
  };

  return (
    <MultiInputDateTimeRangeField
      format="DD/MM/YYYY HH:mm"
      value={[startDate, endDate]}
      onChange={onChange}
      onBlur={handleBlur}
      slotProps={{
        textField: ({ position }) => ({
          label: position === "start" ? startDateLabel : endDateLabel,
        }),
      }}
    />
  );
}
