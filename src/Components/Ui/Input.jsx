// src/components/ui/input.jsx
import React from 'react';

export const Input = ({ className, ...props }) => {
  return <input className={`input ${className}`} {...props} />;
};
