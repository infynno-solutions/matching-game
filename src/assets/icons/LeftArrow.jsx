import React from "react";

const LeftArrow = ({ className, ...props }) => {
  return (
    <svg
      stroke="currentColor"
      fill="currentColor"
      className={className}
      strokeWidth="2"
      viewBox="0 0 24 24"
      aria-hidden="true"
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M7 16l-4-4m0 0l4-4m-4 4h18"
      ></path>
    </svg>
  );
};

export default LeftArrow;
