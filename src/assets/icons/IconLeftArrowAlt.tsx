import { IconProps } from "@/utils/types";
import React from "react";

export const IconLeftArrowAlt: React.FC<IconProps> = ({
  size = 24,
  color = "currentColor",
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height={size}
    viewBox="0 -960 960 960"
    width={size}
    fill="none"
  >
    <path
      d="M400-240 160-480l240-240 56 58-142 142h486v80H314l142 142-56 58Z"
      fill={color}
    />
  </svg>
);
