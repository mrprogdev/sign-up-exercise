import React from "react";

const Button = ({ isLoading, className, children, ...props }) => {
  return (
    <button className="btn btn-dark mt-3" {...props}>
      {isLoading ? "loading..." : children}
    </button>
  );
};

export default Button;
