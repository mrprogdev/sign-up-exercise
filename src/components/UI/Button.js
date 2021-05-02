import React from "react";

const Button = ({ isLoading, className, children, ...props }) => {
  return !isLoading ? (
    <button disabled={isLoading} className={"btn " + className} {...props}>
      {!isLoading ? children : "loading..."}
    </button>
  ) : (
    <div className="spinner-border" role="status">
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default Button;
