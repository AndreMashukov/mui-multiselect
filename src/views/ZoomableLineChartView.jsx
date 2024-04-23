import { useState } from "react";
import ZoomableLineChart from "../components/ZoomableLineChart/ZoomableLineChart";

const ZoomableLineChartView = () => {
  const [data, setData] = useState(
    Array.from({ length: 50 }, () => Math.round(Math.random() * 100))
  );

  return (
    <div style={{ padding: "20px" }}>
      <h2>Zoomable Line Chart with D3 </h2>
      <ZoomableLineChart data={data} />
      <button
        onClick={() => setData([...data, Math.round(Math.random() * 100)])}
      >
        Add data
      </button>
    </div>
  );
};

export default ZoomableLineChartView;