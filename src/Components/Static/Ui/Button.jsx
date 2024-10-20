/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";

export const Button = ({ children, className, ...props }) => {
  return (
    <button className={`btn ${className}`} {...props}>
      {children}
    </button>
  );
};
