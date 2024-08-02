import { ComponentProps } from "react";

export const CrossIcon = (props: ComponentProps<"svg">) => {
  return (
    <svg
      width="25"
      height="26"
      viewBox="0 0 25 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <line
        y1="-2"
        x2="30"
        y2="-2"
        transform="matrix(0.707136 -0.707077 0.707136 0.707077 3 25)"
        stroke="#192544"
        strokeWidth="4"
      />
      <line
        y1="-2"
        x2="30"
        y2="-2"
        transform="matrix(-0.707107 -0.707107 0.707048 -0.707166 24.2131 22.2131)"
        stroke="#192544"
        strokeWidth="4"
      />
    </svg>
  );
};
