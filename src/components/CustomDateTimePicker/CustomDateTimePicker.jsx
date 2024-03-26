import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import TextField from '@mui/material/TextField';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import IconButton from '@mui/material/IconButton';
import moment from 'moment';
import { useState } from 'react';


export const CustomDateTimePicker = () => {
  const [value, setValue] = useState(moment("2022-04-17T15:30"))
  return (
    <DateTimePicker
      label="Datetime picker"
      value={value}
      onChange={(newValue) => setValue(newValue)}
      format="DD/MM/YYYY HH:mm"
      // slotProps={{ textField: { InputProps: { endAdornment: <AccessTimeIcon /> } } }}
    />
  )
}