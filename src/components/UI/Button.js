import React from "react";

const button = ({ isLoading, className, children, ...props }) => {
  return (
    <button className="btn" {...props}>
      {isLoading ? "loading..." : children}
    </button>
  );
};

export default button;
