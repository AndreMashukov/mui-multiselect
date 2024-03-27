import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import TextField from '@mui/material/TextField';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import IconButton from '@mui/material/IconButton';
import moment from 'moment';
import { useState } from 'react';

export const CustomDateTimePicker = () => {
  const [value, setValue] = useState(moment());
  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState('');

  const handleDateChange = (newValue) => {
    setValue(newValue);
    
    // console.log(newValue.format());
    // console.log(newValue.isAfter(moment()));

    // Add your validation logic here
    if (newValue.isBefore(moment())) {
      setError(true);
      setHelperText('Error: Invalid date');
    } else {
      setError(false);
      setHelperText('');
    }
  };

  return (
    <DateTimePicker
      label="Datetime picker"
      value={value}
      onChange={handleDateChange}
      format="DD/MM/YYYY HH:mm"
      slotProps={{
        textField: {
          // InputProps: {
          //   startAdornment: <AccessTimeIcon />,
          // },
          error: error,
          helperText: helperText,
        },
      }}
    />
  )
}