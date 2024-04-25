import { useEffect, useState } from "react";
import ZoomableLineChartA from "../components/ZoomableLineChart/ZoomableLineChartA";
import SelectorSecondary from "../components/SelectorSecondary/SelectorSecondary";
import { Grid, MenuItem, Select, Typography } from "@mui/material";
import moment from "moment";

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
  const [selectedOption, setSelectedOption] = useState();

  const selectorOptions = [
    { id: "day", label: "1 day", value: 86400000 },
    { id: "week", label: "1 week", value: 604800000 },
    { id: "month", label: "1 month", value: 2628000000 },
    { id: "year", label: "1 year", value: 31540000000 },
  ];

  const [timeScaleStep, setTimeScaleStep] = useState(
    TIME_SCALE_STEPS_MS[0].value
  );

  const [data, setData] = useState([]);

  const handleTimeScaleChange = (event) => {
    setTimeScaleStep(event.target.value);
  };

  const getData = () => {
    const newData = generateData(timeScaleStep);
    // console.log(timeScaleStep, newData.length);
    setData(newData);
  };

  // data format:
  // date:  Thu Feb 29 2024 20:30:22 GMT+0800 (Hong Kong Standard Time) {}
  // value:  62
  const filterBySelectorOption = (data) => {
    if (!selectedOption) return data;

    const selected = selectorOptions.find(
      (option) => option.id === selectedOption
    );
    // console.log(selected);
    if (!selected) return data;
    // now in unix fromat
    const now = new Date().getTime();
    const startDate = moment(now - selected.value);
    // console.log(selectedOption.value, startDate.format("DD/MM/YYYY HH:mm"));

    const newData = data.filter((d) => {
      return moment.utc(d.date).isAfter(startDate);
    });
    // console.log(newData);
    return newData;
  };

  useEffect(() => {
    getData();
  }, [timeScaleStep]);

  return (
    <div style={{ padding: "20px", width: 800 }}>
      <Grid container justifyContent="center">
        <Typography variant="h4">Random Data</Typography>
      </Grid>
      <Grid container justifyContent="space-between">
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
        <Grid item>
          <SelectorSecondary
            options={selectorOptions}
            setSelectedOption={setSelectedOption}
            selectedOption={selectedOption}
            extraStyles={{ mb: 2 }}
          />
        </Grid>
      </Grid>
      <div>
        {data && data.length && (
          <ZoomableLineChartA data={filterBySelectorOption(data)} />
        )}
      </div>
    </div>
  );
};

export default ZoomableLineChartView;
