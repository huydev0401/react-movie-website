import React from "react";
import PropTypes from "prop-types";

const Button = ({
  onClick,
  children,
  className = "",
  bgColor = "primary",
  type = "button",
  full = false,
  ...props
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
      {...props}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.any,
  className: PropTypes.string,
  bgColor: PropTypes.string,
  type: PropTypes.string,
  full: PropTypes.bool,
};

export default Button;
