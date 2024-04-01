import * as React from 'react';
import { MultiInputDateTimeRangeField } from '@mui/x-date-pickers-pro/MultiInputDateTimeRangeField';
import moment from 'moment';

export default function CustomRangePicker() {
  const [value, setValue] = React.useState(() => [
    moment('2022-04-17T15:30'),
    moment('2022-04-21T18:30'),
  ]);

  return (
    <MultiInputDateTimeRangeField
      format="DD/MM/YYYY HH:mm"
      value={value}
      onChange={(newValue) => setValue(newValue)}
      slotProps={{
        textField: ({ position }) => ({
          label: position === 'start' ? 'Start Date' : 'End Date',
        }),
      }} 
    />
  );
}
