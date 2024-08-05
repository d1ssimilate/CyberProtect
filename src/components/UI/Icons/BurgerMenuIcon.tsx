import { ComponentProps } from "react";

export const BurgerMenuIcon = (props: ComponentProps<"svg">) => {
  return (
    <svg
      width="30"
      height="20"
      viewBox="0 0 30 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <line
        y1="-2"
        x2="30"
        y2="-2"
        transform="matrix(1 0 8.33665e-05 1 0 4)"
        stroke="#192544"
        strokeWidth="4"
      />
      <line
        y1="-2"
        x2="30"
        y2="-2"
        transform="matrix(1 0 8.33665e-05 1 0 12)"
        stroke="#192544"
        strokeWidth="4"
      />
      <line
        y1="-2"
        x2="30"
        y2="-2"
        transform="matrix(1 0 8.33665e-05 1 0 20)"
        stroke="#192544"
        strokeWidth="4"
      />
    </svg>
  );
};
