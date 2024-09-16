import React from 'react';

export const Label = ({ htmlFor, className, children, ...props }) => {
  return (
    <label
      htmlFor={htmlFor}
      className={`text-sm font-medium leading-none ${className}`}
      {...props}
    >
      {children}
    </label>
  );
};
