import React from "react";

const Button = ({
  onClick,
  children,
  className,
  bgColor = "primary",
  type = "button",
  full = false,
}) => {
  let bgClassName = "bg-primary";
  switch (bgColor) {
    case "primary":
      bgClassName = "bg-primary";
      break;
    case "secondary":
      bgClassName = "bg-secondary";
      break;
    default:
      break;
  }
  return (
    <button
      type={type}
      onClick={onClick}
      className={`py-3 px-6 capitalize rounded-lg text-white font-medium mt-auto ${
        full ? "w-full" : ""
      } ${bgClassName} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
