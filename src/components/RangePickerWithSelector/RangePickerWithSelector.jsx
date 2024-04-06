/* eslint-disable react/prop-types */
import { LocalizationProvider } from "@mui/x-date-pickers";
import SelectorSecondary from "../SelectorSecondary/SelectorSecondary";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import CustomRangePicker from "../CustomRangePicker/CustomRangePicker";
import ValidationError from "../ValidationError/ValidationError";
import { useEffect, useState } from "react";
import moment from "moment";

const RangePickerWithSelector = ({ formik, startDateName, endDateName }) => {
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
      formik.setFieldValue(startDateName, moment().subtract(1, unit));
      formik.setFieldValue(endDateName, moment());
    }
  }, [selectedOption]);

  useEffect(() => {
    if (selectedOption) {
      const unit = selectedOption;
      if (
        !moment(formik.values[startDateName]).isSame(
          moment().subtract(1, unit),
          "day"
        ) ||
        !moment(formik.values[endDateName]).isSame(moment(), "day")
      ) {
        setSelectedOption(undefined);
      }
    }
    // forcibly run formik validation on startDate and endDate
    formik.setFieldTouched(startDateName, true);
    formik.setFieldTouched(endDateName, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values[startDateName], formik.values[endDateName]]);

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
        startDate={getDate(formik.values[startDateName])}
        endDate={getDate(formik.values[endDateName])}
        setStartDate={(value) =>
          formik.setFieldValue(startDateName, value.format("DD/MM/YYYY HH:mm"))
        }
        setEndDate={(value) =>
          formik.setFieldValue(endDateName, value.format("DD/MM/YYYY HH:mm"))
        }
        startDateLabel="Start Date"
        endDateLabel="End Date"
        handleBlur={() => {
          formik.setFieldTouched(startDateName, true);
          formik.setFieldTouched(endDateName, true);
        }}
      />
      {(formik.errors[endDateName] || formik.errors[startDateName]) &&
        formik.touched[startDateName] &&
        formik.touched[endDateName] && (
          <ValidationError
            message={formik.errors[startDateName] || formik.errors[endDateName]}
          />
        )}
    </LocalizationProvider>
  );
};

export default RangePickerWithSelector;
