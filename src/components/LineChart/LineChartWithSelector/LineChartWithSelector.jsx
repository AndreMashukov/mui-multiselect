import Grid from "@mui/material/Grid2";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import {Box} from "@mui/material";
import ZoomableLineChart from "../ZoomableLineChart/ZoomableLineChart";
import RangePickerWithSelector from "../../../datePickers/RangePickerWithSelector/RangePickerWithSelector";
import {TIME_SCALE_STEPS_MS} from "./constants";
import colorsUtil from "../../../../utils/colors";
import LineChartThresholdSegment from "../LineChartThresholdSegment/LineChartThresholdSegment";
import LineChartThresholdArea from "../LineChartThresholdArea/LineChartThresholdArea";

const LineChartWithSelector = ({
  data,
  timeScaleStep,
  handleTimeScaleChange,
  form,
  colors,
  labels,
  type = "basic",
  thresholds,
}) => {
  const colorsLocal =
    colors || labels.map(() => colorsUtil.generateRandomColor());
  return (
    <div style={{padding: "20px", width: 800}}>
      <Grid container justifyContent="space-between">
        <Grid item>
          <Grid container flexDirection="column" justifyContent="space-between">
            <Grid item sx={{mb: 2}}>
              <Typography variant="h4">Random Data</Typography>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container justifyContent="flex-start" alignItems="center">
              <Typography variant="body1" sx={{mr: 1}}>
                Data aggregation
              </Typography>
              <Select
                value={timeScaleStep}
                onChange={handleTimeScaleChange}
                displayEmpty
                inputProps={{"aria-label": "Without label"}}
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
          <RangePickerWithSelector form={form} />
        </Grid>
      </Grid>
      <Box>
        {data && data.length && type === "basic" && (
          <ZoomableLineChart
            dataArray={data}
            colors={colorsLocal}
            labels={labels}
          />
        )}
        {data && data.length && type === "segment" && (
          <LineChartThresholdSegment
            dataArray={data}
            colors={colorsLocal}
            labels={labels}
            thresholds={thresholds}
          />
        )}
        {data && data.length && type === "area" && (
          <LineChartThresholdArea
            dataArray={data}
            colors={colorsLocal}
            labels={labels}
            thresholds={thresholds}
          />
        )}
      </Box>
    </div>
  );
};

export default LineChartWithSelector;

LineChartWithSelector.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
    })
  ).isRequired,
  timeScaleStep: PropTypes.number.isRequired,
  handleTimeScaleChange: PropTypes.func.isRequired,
  form: PropTypes.object.isRequired,
  colors: PropTypes.array.isRequired,
  labels: PropTypes.array.isRequired,
  type: PropTypes.oneOf(["basic", "segment", "area"]),
  thresholds: PropTypes.array,
};
