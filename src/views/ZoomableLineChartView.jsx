import { useEffect, useState } from "react";
import ZoomableLineChartA from "../components/ZoomableLineChart/ZoomableLineChartA";
import SelectorSecondary from "../components/SelectorSecondary/SelectorSecondary";
import { Grid, MenuItem, Select, Typography } from "@mui/material";

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
    { id: "day", label: "1 day" },
    { id: "week", label: "1 week" },
    { id: "month", label: "1 month" },
    { id: "year", label: "1 year" },
  ];

  const [timeScaleStep, setTimeScaleStep] = useState(
    TIME_SCALE_STEPS_MS[0].value
  );

  const [data, setData] = useState([]);

  const handleTimeScaleChange = (event) => {
    setTimeScaleStep(event.target.value);
  };

  // const getData = () => {
  //   d3.csv(
  //     "https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/3_TwoNumOrdered_comma.csv",
  //     function (d) {
  //       return { date: d3.timeParse("%Y-%m-%d")(d.date), value: d.value };
  //     }
  //   ).then(function (data) {
  //     setData(data);
  //     console.log(generateData());
  //   });
  // };
  const getData = () => {
    const newData = generateData(timeScaleStep);
    // console.log(timeScaleStep, newData.length);
    setData(newData);
  };

  useEffect(() => {
    getData();
  }, [timeScaleStep]);

  return (
    <div style={{ padding: "20px", width: 800 }}>
      <Grid container justifyContent="center">
        <Typography variant="h4">Random Data (2 hour interval)</Typography>
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
      <div>{data && data.length && <ZoomableLineChartA data={data} />}</div>
    </div>
  );
};

export default ZoomableLineChartView;
