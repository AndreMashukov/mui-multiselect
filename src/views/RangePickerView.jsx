import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import CustomRangePicker from "../components/CustomRangePicker/CustomRangePicker";
import { useFormik } from "formik";
import moment from "moment";
import { Button } from "@mui/material";
import SelectorSecondary from "../components/SelectorSecondary/SelectorSecondary";
import { useEffect, useState } from "react";

// https://mui.com/x/react-date-pickers/date-time-picker/

export const RangePickerView = () => {
  const formik = useFormik({
    initialValues: {
      startDate: moment(),
      endDate: moment().add(1, "day"),
    },
    onSubmit: (values) => {
      console.log({
        startDate: values.startDate.format(),
        endDate: values.endDate.format(),
      });
    },
  });

  const [selectedOption, setSelectedOption] = useState();

  const selectorOprtions = [
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

  // useEffect(() => {
  //   if (selectedOption) {
  //     const unit = timeUnits[selectedOption];
  //     // if start date not equal to today - unit then reset selected option
  //     if (!moment(formik.values.startDate).isSame(moment().subtract(1, unit))) {
  //       setSelectedOption(undefined);
  //     }
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [formik.values.startDate, formik.values.endDate]);

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <SelectorSecondary
        options={selectorOprtions}
        setSelectedOption={setSelectedOption}
        selectedOption={selectedOption}
        extraStyles={{ mb: 2 }}
      />
      <CustomRangePicker
        startDate={formik.values.startDate}
        endDate={formik.values.endDate}
        setStartDate={(value) => formik.setFieldValue("startDate", value)}
        setEndDate={(value) => formik.setFieldValue("endDate", value)}
        startDateLabel="Start Date"
        endDateLabel="End Date"
      />
      <Button
        onClick={formik.handleSubmit}
        sx={{
          mt: 2,
        }}
      >
        Submit
      </Button>
    </LocalizationProvider>
  );
};
