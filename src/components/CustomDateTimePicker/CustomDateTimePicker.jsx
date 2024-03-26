import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import moment from 'moment';
import { useState } from 'react';

export const CustomDateTimePicker = () => {
  const [value, setValue] = useState(moment("2022-04-17T15:30"))
  return (
    <DateTimePicker
      label="Datetime picker"
      value={value}
      onChange={(newValue) => setValue(newValue)}
    />
  )
}