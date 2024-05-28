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
import { SankeyDiagramView } from "./views/SankeyDiagramView";
import { StackedBarChartView } from "./views/StackedBarChartView";
import { BasicBarChartView } from "./views/BasicBarChartView";
import { InventoryPageView } from "./views/InventoryPageView";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Grid
        container
        sx={{ position: "relative", ml: 3}}
      >
        {/* <MultiSelectTestView /> */}
        {/* <ModalContainerTestView /> */}
        {/* <DatepickerView /> */}
        {/* <RangePickerView /> */}
        {/* <CustomSelectView /> */}
        {/* <LineChartView /> */}
        {/* <ZoomableLineChartView /> */}
        {/* <SankeyDiagramView /> */}
        <StackedBarChartView />
        {/* <BasicBarChartView /> */}
        {/* <InventoryPageView /> */}
      </Grid>
    </ThemeProvider>
  );
}

export default App;
