import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { CustomDateTimePicker } from '../components/CustomDateTimePicker/CustomDateTimePicker';

// https://mui.com/x/react-date-pickers/date-time-picker/

export const DatepickerView = () => {
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <CustomDateTimePicker />
    </LocalizationProvider>
  )
}