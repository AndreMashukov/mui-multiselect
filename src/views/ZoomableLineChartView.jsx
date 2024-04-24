import { useState } from "react";
import ZoomableLineChart from "../components/ZoomableLineChart/ZoomableLineChartA";

const ZoomableLineChartView = () => {
  // const [data, setData] = useState(
  //   Array.from({ length: 50 }, () => Math.round(Math.random() * 100))
  // );

  return (
    <div style={{ padding: "20px" }}>
      <ZoomableLineChart />
      {/* <button
        onClick={() => setData([...data, Math.round(Math.random() * 100)])}
      >
        Add data
      </button> */}
    </div>
  );
};

export default ZoomableLineChartView;