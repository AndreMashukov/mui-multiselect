import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import moment from 'moment';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useState } from 'react';

export const DatepickerView = () => {
  const [value, setValue] = useState(moment("2022-04-17T15:30"))
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <DateTimePicker
        label="Datetime picker"
        value={value}
        onChange={(newValue) => setValue(newValue)}
      />
    </LocalizationProvider>
  )
}