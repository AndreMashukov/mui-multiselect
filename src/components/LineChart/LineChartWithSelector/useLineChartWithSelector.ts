/* eslint-disable @typescript-eslint/no-explicit-any */
import {useState, useEffect, useCallback} from "react";
import moment from "moment";
import {TIME_SCALE_STEPS_MS, NUM_LINES, generateData} from "./constants";
import {
  useCustomRangePickerForm,
  UseCustomRangePickerFormReturn,
} from "../../../datePickers/CustomRangePicker/useCustomRangePickerForm";

const useLineChartWithSelector = () => {
  const form: UseCustomRangePickerFormReturn = useCustomRangePickerForm();
  const [timeScaleStep, setTimeScaleStep] = useState<number>(
    TIME_SCALE_STEPS_MS[1].value
  );
  const [data, setData] = useState<any[]>([]);

  const handleTimeScaleChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setTimeScaleStep(Number(event.target.value));
  };

  const getData = useCallback(() => {
    const newData = Array.from({length: NUM_LINES}, () =>
      generateData(timeScaleStep)
    );
    setData(newData);
  }, [timeScaleStep]);

  const filterByDateRange = (dataParam: any[]) => {
    const {startDate, endDate} = form.getValues();

    if (!startDate || !endDate) return dataParam;

    const start = moment(startDate);
    const end = moment(endDate);

    const newData = dataParam.filter((d) => {
      const date = moment.utc(d.date);
      return date.isAfter(start) && date.isBefore(end);
    });

    return newData;
  };

  useEffect(() => {
    getData();
  }, [getData]);

  return {
    form,
    timeScaleStep,
    data,
    handleTimeScaleChange,
    filterByDateRange,
  };
};

export default useLineChartWithSelector;
