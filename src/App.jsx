import ThemeProvider from "@mui/material/styles/ThemeProvider";
import theme from "./theme";
import CssBaseline from "@mui/material/CssBaseline/CssBaseline";
import { Grid } from "@mui/material";
import { MultiSelectTestView } from "./views/MultiSelectTestView";
import { ModalContainerTestView } from "./views/ModalContainerTestView";
import { DatepickerView } from "./views/DatepickerView";
import { RangePickerView } from "./views/RangePickerView";
import { CustomSelectView } from "./views/CustomSelectView";
import ZoomableLineChartView from "./views/ZoomableLineChartView";
import { SankeyDiagramView } from "./views/SankeyDiagramView";
import { StackedBarChartView } from "./views/StackedBarChartView";
import { BasicBarChartView } from "./views/BasicBarChartView";
import { InventoryPageView } from "./views/InventoryPageView";
import { AnimatedListView } from "./views/AnimatedListView";
import { PreferenceView } from "./views/PreferenceView";
import { DoughnutChartCardView } from "./views/DoughnutCardView"
import LineChartView from "./views/LineChartView";

// import { Button } from "@digitaledgedc/deuikit";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Grid container>
        {/* <MultiSelectTestView /> */}
        {/* <ModalContainerTestView /> */}
        {/* <DatepickerView /> */}
        {/* <RangePickerView /> */}
        {/* <CustomSelectView /> */}
        <LineChartView />
        {/* <ZoomableLineChartView /> */}
        {/* <SankeyDiagramView /> */}
        {/* <StackedBarChartView /> */}
        {/* <BasicBarChartView /> */}
        {/* <InventoryPageView /> */}
        {/* <AnimatedListView /> */}
        {/* <PreferenceView /> */}
        {/* <Button>Test</Button> */}
        {/* <DoughnutChartCardView /> */}
      </Grid>
    </ThemeProvider>
  );
}

export default App;
