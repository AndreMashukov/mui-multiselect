import { Button } from "@mui/material";
import RangePickerWithSelector from "../components/RangePickerWithSelector/RangePickerWithSelector";
import { useDateRangeForm } from "../hooks/useDateRangeForm";

// https://mui.com/x/react-date-pickers/date-time-picker/

export const RangePickerView = () => {
  const formik = useDateRangeForm();

  return (
    <>
      <RangePickerWithSelector
        formik={formik}
        startDateName="startDate"
        endDateName="endDate"
      />
      <br />
      <Button
        onClick={formik.handleSubmit}
        disabled={!formik.isValid}
        sx={{
          mt: 2,
        }}
      >
        Submit
      </Button>
    </>
  );
};
