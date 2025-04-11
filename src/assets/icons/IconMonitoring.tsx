import { IconProps } from "@/utils/types";

export const IconMonitoring = ({
  size = 24,
  color = "currentColor",
}: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ minWidth: size }}
  >
    <g mask="url(#mask0_6599_31175)">
      <path
        d="M3.25 20.75V19.1057L4.75 17.6057V20.75H3.25ZM7.25 20.75V15.1057L8.75 13.6057V20.75H7.25ZM11.25 20.75V13.6057L12.75 15.1307V20.75H11.25ZM15.25 20.75V15.1307L16.75 13.6307V20.75H15.25ZM19.25 20.75V11.1057L20.75 9.60571V20.75H19.25ZM3.25 15.2192V13.1057L10 6.35571L14 10.3557L20.75 3.60571V5.71921L14 12.4692L10 8.46921L3.25 15.2192Z"
        fill={color}
      />
    </g>
  </svg>
);
