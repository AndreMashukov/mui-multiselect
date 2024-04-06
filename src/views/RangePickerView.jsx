import { useFormik } from "formik";
import moment from "moment";
import { Button } from "@mui/material";
import * as yup from "yup";
import RangePickerWithSelector from "../components/RangePickerWithSelector/RangePickerWithSelector";

// https://mui.com/x/react-date-pickers/date-time-picker/

export const RangePickerView = () => {
  const validationSchema = yup.object({
    startDate: yup
      .string()
      .required()
      .test("valid", "Start date is invalid", (value) => {
        return moment(value).isValid();
      }),
    endDate: yup
      .string()
      .required()
      .test("valid", "End date is invalid", (value) => {
        return moment(value).isValid();
      })
      .test("after", "End date must be after start date", function (value) {
        const { startDate } = this.parent;
        return moment(value).isAfter(moment(startDate));
      }),
  });

  const formik = useFormik({
    initialValues: {
      startDate: undefined,
      endDate: undefined,
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("submit", {
        startDate: values.startDate,
        endDate: values.endDate,
      });
    },
  });

  return (
    <>
      <RangePickerWithSelector formik={formik} />
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
