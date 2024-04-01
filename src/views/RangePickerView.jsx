import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import CustomRangePicker from '../components/CustomRangePicker/CustomRangePicker';

// https://mui.com/x/react-date-pickers/date-time-picker/

export const RangePickerView = () => {
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <CustomRangePicker />
    </LocalizationProvider>
  )
}