import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { CustomDateTimePicker } from "../components/CustomDateTimePicker/CustomDateTimePicker";
import moment from "moment";
import { useState } from "react";

// https://mui.com/x/react-date-pickers/date-time-picker/

export const DatepickerView = () => {
  const [value, setValue] = useState(moment());
  const [errorMessage, setErrorMessage] = useState();

  const handleDateChange = (newValue) => {
    setValue(newValue);
    // console.log(newValue.format());
    // console.log(newValue.isAfter(moment()));

    // Add your validation logic here
    if (newValue.isBefore(moment())) {
      setErrorMessage("Error: Invalid date");
    } else {
      setErrorMessage("");
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <CustomDateTimePicker 
        label="Date and Time" 
        value={value} 
        handleChange={handleDateChange} 
        errorMessage={errorMessage}
      />
    </LocalizationProvider>
  );
};
