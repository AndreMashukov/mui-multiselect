import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import CustomRangePicker from "../components/CustomRangePicker/CustomRangePicker";
import { useFormik } from "formik";
import moment from "moment";
import { Button } from "@mui/material";

// https://mui.com/x/react-date-pickers/date-time-picker/

export const RangePickerView = () => {
  const formik = useFormik({
    initialValues: {
      startDate: moment(),
      endDate: moment().add(1, "hour"),
    },
    onSubmit: (values) => {
      console.log({
        startDate: values.startDate.format(),
        endDate: values.endDate.format(),
      });
    },
  });

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <CustomRangePicker 
        startDate={formik.values.startDate}
        endDate={formik.values.endDate}
        setStartDate={(value) => formik.setFieldValue("startDate", value)}
        setEndDate={(value) => formik.setFieldValue("endDate", value)}
        startDateLabel="Start Date" 
        endDateLabel="End Date" 
      />
      <Button onClick={formik.handleSubmit}>Submit</Button>
    </LocalizationProvider>
  );
};
