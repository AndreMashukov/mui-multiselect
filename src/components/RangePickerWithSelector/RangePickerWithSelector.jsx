/* eslint-disable react/prop-types */
import { LocalizationProvider } from "@mui/x-date-pickers";
import SelectorSecondary from "../SelectorSecondary/SelectorSecondary";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import CustomRangePicker from "../CustomRangePicker/CustomRangePicker";
import ValidationError from "../ValidationError/ValidationError";
import { useEffect, useState } from "react";
import moment from "moment";

const RangePickerWithSelector = ({ formik }) => {
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

  // return null or date
  const getDate = (date) => {
    return date ? moment(date, "DD/MM/YYYY HH:mm") : null;
  };

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <SelectorSecondary
        options={selectorOptions}
        setSelectedOption={setSelectedOption}
        selectedOption={selectedOption}
        extraStyles={{ mb: 2 }}
      />
      <CustomRangePicker
        startDate={getDate(formik.values.startDate)}
        endDate={getDate(formik.values.endDate)}
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
      {(formik.errors.endDate || formik.values.startDate) &&
        formik.touched.startDate &&
        formik.touched.endDate && (
          <ValidationError
            message={formik.errors.startDate || formik.errors.endDate}
          />
        )}
    </LocalizationProvider>
  );
};

export default RangePickerWithSelector;
