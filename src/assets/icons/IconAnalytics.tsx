import { IconProps } from "@/utils/types";
import React from "react";

export const IconAnalytics: React.FC<IconProps> = ({
  size = 24,
  color = "currentColor",
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ minWidth: size }}
  >
    <mask
      id="mask0_6857_2361"
      maskUnits="userSpaceOnUse"
      x="0"
      y="0"
      width={size}
      height={size}
    >
      <rect width={size} height={size} fill="#D9D9D9" />
    </mask>
    <g mask="url(#mask0_6857_2361)">
      <path
        d="M3.25 20.75V19.1058L4.75 17.6058V20.75H3.25ZM7.25 20.75V15.1058L8.75 13.6058V20.75H7.25ZM11.25 20.75V13.6058L12.75 15.1308V20.75H11.25ZM15.25 20.75V15.1308L16.75 13.6308V20.75H15.25ZM19.25 20.75V11.1058L20.75 9.60577V20.75H19.25ZM3.25 15.2193V13.1058L10 6.35577L14 10.3558L20.75 3.60577V5.71927L14 12.4693L10 8.46927L3.25 15.2193Z"
        fill={color}
      />
    </g>
  </svg>
);
