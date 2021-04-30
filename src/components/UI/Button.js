import React from "react";

const Button = ({ isLoading, className, children, ...props }) => {
  return (
    <button className={"btn " + className} {...props}>
      {isLoading ? "loading..." : children}
    </button>
  );
};

export default Button;
