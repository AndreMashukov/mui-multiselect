import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import CustomRangePicker from "../components/CustomRangePicker/CustomRangePicker";
import { useFormik } from "formik";
import moment from "moment";
import { Button } from "@mui/material";
import SelectorSecondary from "../components/SelectorSecondary/SelectorSecondary";
import { useEffect, useState } from "react";
import * as yup from "yup";
import ValidationError from "../components/ValidationError/ValidationError";

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
        startDate: values.startDate.format(),
        endDate: values.endDate.format(),
      });
    },
  });

  // console.log(formik.errors);
  const [selectedOption, setSelectedOption] = useState();

  const selectorOptions = [
    { id: "day", label: "1 day" },
    { id: "week", label: "1 week" },
    { id: "month", label: "1 month" },
    { id: "year", label: "1 year" },
  ];

  useEffect(() => {
    if (!selectedOption) return;
    const unit = selectedOption;
    if (unit) {
      formik.setFieldValue("startDate", moment().subtract(1, unit));
      formik.setFieldValue("endDate", moment());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedOption]);

  useEffect(() => {
    if (selectedOption) {
      const unit = selectedOption;
      if (
        !moment(formik.values.startDate).isSame(
          moment().subtract(1, unit),
          "day"
        ) ||
        !moment(formik.values.endDate).isSame(moment(), "day")
      ) {
        setSelectedOption(undefined);
      }
    }
    // forcibly run formik validation on startDate and endDate
    formik.setFieldTouched("startDate", true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values.startDate, formik.values.endDate]);

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <SelectorSecondary
        options={selectorOptions}
        setSelectedOption={setSelectedOption}
        selectedOption={selectedOption}
        extraStyles={{ mb: 2 }}
      />
      <CustomRangePicker
        startDate={moment(formik.values.startDate, "DD/MM/YYYY HH:mm")}
        endDate={moment(formik.values.endDate, "DD/MM/YYYY HH:mm")}
        setStartDate={(value) =>
          formik.setFieldValue("startDate", value.format("DD/MM/YYYY HH:mm"))
        }
        setEndDate={(value) =>
          formik.setFieldValue("endDate", value.format("DD/MM/YYYY HH:mm"))
        }
        startDateLabel="Start Date"
        endDateLabel="End Date"
        handleBlur={() => {
          formik.setFieldTouched("startDate", true);
          formik.setFieldTouched("endDate", true);
        }}
      />
      {/* {formik.touched.endDate &&
        formik.touched.startDate &&
        formik.errors.endDate && (
          <ValidationError message={formik.errors.endDate} />
        )} */}
      {(formik.errors.endDate || formik.values.startDate) &&
        formik.touched.startDate &&
        formik.touched.endDate && (
          <ValidationError
            message={formik.errors.startDate || formik.errors.endDate}
          />
        )}
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
    </LocalizationProvider>
  );
};
