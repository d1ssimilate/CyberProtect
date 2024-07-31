import { ComponentProps } from "react";

export const BurgerMenuIcon = (props: ComponentProps<"svg">) => {
  return (
    <svg
      viewBox="0 0 48 48"
      xmlns="http://www.w3.org/2000/svg"
      fill="#000000"
      {...props}
    >
      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        {" "}
        <title>menu-hamburger</title>{" "}
        <g id="Layer_2" data-name="Layer 2">
          {" "}
          <g id="invisible_box" data-name="invisible box">
            {" "}
            <rect width="48" height="48" fill="none"></rect>{" "}
          </g>{" "}
          <g id="icons_Q2" data-name="icons Q2">
            {" "}
            <g>
              {" "}
              <path
                d="M42,12a2,2,0,0,1-2,2H8a2,2,0,0,1-2-2H6a2,2,0,0,1,2-2H40a2,2,0,0,1,2,2Z"
                fill="#192544"
              ></path>{" "}
              <path
                d="M42,24a2,2,0,0,1-2,2H8a2,2,0,0,1-2-2H6a2,2,0,0,1,2-2H40a2,2,0,0,1,2,2Z"
                fill="#192544"
              ></path>{" "}
              <path
                d="M42,36a2,2,0,0,1-2,2H8a2,2,0,0,1-2-2H6a2,2,0,0,1,2-2H40a2,2,0,0,1,2,2Z"
                fill="#192544"
              ></path>{" "}
            </g>{" "}
          </g>{" "}
        </g>{" "}
      </g>
    </svg>
  );
};
