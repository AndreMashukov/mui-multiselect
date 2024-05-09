import { useEffect, useState } from "react";
import ZoomableLineChart from "../components/ZoomableLineChart/ZoomableLineChart";
import { Grid, MenuItem, Select, Typography } from "@mui/material";
import moment from "moment";
import RangePickerWithSelector from "../components/RangePickerWithSelector/RangePickerWithSelector";
import { useDateRangeForm } from "../hooks/useDateRangeForm";

const NUM_LINES = 3;

const COLORS = ["red", "green", "blue"];

const LABELS = [
  "Line 1",
  "Line 2",
  "Line 3",
]

const TIME_SCALE_STEPS_MS = [
  { name: "1 hour", value: 3600000 },
  { name: "6 hours", value: 21600000 },
  { name: "1 day", value: 86400000 },
];

const generateData = (step) => {
  const data = [];
  const startDate = new Date();
  startDate.setMonth(startDate.getMonth() - 2);
  const endDate = new Date();

  for (let i = startDate; i <= endDate; i.setTime(i.getTime() + step)) {
    data.push({
      date: new Date(i),
      value: Math.floor(Math.random() * 100),
    });
  }

  return data;
};

const ZoomableLineChartView = () => {
  const dateRangeForm = useDateRangeForm();
  const [timeScaleStep, setTimeScaleStep] = useState(
    TIME_SCALE_STEPS_MS[0].value
  );

  const [data, setData] = useState([]);

  const handleTimeScaleChange = (event) => {
    setTimeScaleStep(event.target.value);
  };

  const getData = () => {
    const newData = Array.from({ length: NUM_LINES }, () =>
      generateData(timeScaleStep)
    );
    setData(newData);
  };

  // data format:
  // date:  Thu Feb 29 2024 20:30:22 GMT+0800 (Hong Kong Standard Time) {}
  // value:  62
  const filterByDateRange = (data) => {
    const { startDate, endDate } = dateRangeForm.values;

    if (!startDate || !endDate) return data;

    const start = moment(startDate);
    const end = moment(endDate);

    const newData = data.filter((d) => {
      const date = moment.utc(d.date);
      return date.isAfter(start) && date.isBefore(end);
    });

    return newData;
  };

  useEffect(() => {
    getData();
  }, [timeScaleStep]);

  return (
    <div style={{ padding: "20px", width: 800 }}>
      <Grid container justifyContent="space-between">
        <Grid item>
          <Grid container flexDirection="column" justifyContent="space-between">
            <Grid item sx={{ mb: 2 }}>
              <Typography variant="h4">Random Data</Typography>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container justifyContent="flex-start" alignItems="center">
              <Typography variant="body1" sx={{ mr: 1 }}>
                Data aggregation
              </Typography>
              <Select
                value={timeScaleStep}
                onChange={handleTimeScaleChange}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
              >
                {TIME_SCALE_STEPS_MS.map((step) => (
                  <MenuItem key={step.name} value={step.value}>
                    {step.name}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <RangePickerWithSelector
            formik={dateRangeForm}
            startDateName="startDate"
            endDateName="endDate"
          />
        </Grid>
      </Grid>
      <div>
        {data && data.length && (
          // <ZoomableLineChart data={filterByDateRange(data)} />
          <ZoomableLineChart
            dataArray={data.map(filterByDateRange)}
            colors={COLORS}
            labels={LABELS}
          />
        )}
      </div>
    </div>
  );
};

export default ZoomableLineChartView;
