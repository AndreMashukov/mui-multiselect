import React from "react";

const LayoutLeftExpanded = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    version="1.1"
    width={props.width || "203px"}
    height={props.height || "163px"}
    viewBox="-0.5 -0.5 202 162"
    style={{ backgroundColor: "rgb(255, 255, 255)" }}
  >
    <defs />
    <rect fill="#ffffff" width="100%" height="100%" x="0" y="0" />
    <g>
      <g>
        <rect
          x="11"
          y="1"
          width="190"
          height="40"
          fill="#010028"
          stroke="rgb(0, 0, 0)"
          pointerEvents="all"
        />
      </g>
      <g>
        <rect
          x="11"
          y="41"
          width="190"
          height="120"
          fill="#e6e6e6"
          stroke="none"
          pointerEvents="all"
        />
      </g>
      <g>
        <rect
          x="1"
          y="1"
          width="70"
          height="160"
          fill="rgb(255, 255, 255)"
          stroke="#ff7a00"
          strokeWidth="2"
          pointerEvents="all"
        />
      </g>
      <g>
        <rect
          x="161"
          y="71"
          width="40"
          height="90"
          rx="6"
          ry="6"
          fill="rgb(255, 255, 255)"
          stroke="#e6e6e6"
          strokeWidth="2"
          pointerEvents="all"
        />
      </g>
      <g>
        <ellipse
          cx="72.25"
          cy="54.75"
          rx="11.25"
          ry="11.25"
          fill="rgb(255, 255, 255)"
          stroke="#e6e6e6"
          strokeWidth="2"
          pointerEvents="all"
        />
      </g>
      <g>
        <path
          d="M 75.25 48.75 L 69.25 54.75 L 75.25 60.75"
          fill="none"
          stroke="#cccccc"
          strokeWidth="3"
          strokeMiterlimit="10"
          pointerEvents="all"
        />
      </g>
      <g>
        <ellipse
          cx="172.25"
          cy="54.75"
          rx="11.25"
          ry="11.25"
          fill="rgb(255, 255, 255)"
          stroke="none"
          pointerEvents="all"
        />
      </g>
      <g>
        <path
          d="M 175.25 48.75 L 169.25 54.75 L 175.25 60.75"
          fill="none"
          stroke="#cccccc"
          strokeWidth="3"
          strokeMiterlimit="10"
          pointerEvents="all"
        />
      </g>
    </g>
  </svg>
);

export default LayoutLeftExpanded;
