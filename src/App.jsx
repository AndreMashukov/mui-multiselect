import ThemeProvider from "@mui/material/styles/ThemeProvider";
import theme from "./theme";
import CssBaseline from "@mui/material/CssBaseline/CssBaseline";
import { Grid } from "@mui/material";
import { MultiSelectTestView } from "./views/MultiSelectTestView";
import { ModalContainerTestView } from "./views/ModalContainerTestView";
import { DatepickerView } from "./views/DatepickerView";
import { RangePickerView } from "./views/RangePickerView";
import { CustomSelectView } from "./views/CustomSelectView";
import LineChartView from "./views/LineChartView";
import ZoomableLineChartView from "./views/ZoomableLineChartView";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Grid container sx={{ position: "fixed", ml: 3 }}>
        <Grid item xs={10} sx={{ position: "relative", bottom: "300px" }}>
          {/* <MultiSelectTestView /> */}
          {/* <ModalContainerTestView /> */}
          {/* <DatepickerView /> */}
          {/* <RangePickerView /> */}
          {/* <CustomSelectView /> */}
          {/* <LineChartView /> */}
          <ZoomableLineChartView />
        </Grid>
        <Grid xs={4}></Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default App;
