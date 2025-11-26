import React from "react";

const MyContainer = ({ children, className = "" }) => {
  return (
    <div className={`container mx-auto px-7  ${className}`}>{children}</div>
  );
};

export default MyContainer;
