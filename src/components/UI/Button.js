import React from "react";
import cx from "classnames";

export const PrimaryButton = ({ children, ...props }) => (
  <Button className="btn-primary" {...props}>
    {children}
  </Button>
);

const Button = ({
  isLoading,
  className,
  type = "button",
  children,
  ...props
}) => {
  return (
    <button
      className={cx("btn", className)}
      disabled={isLoading}
      type={type}
      {...props}
    >
      {isLoading && <div className="spinner-border " role="status" />}
      {!isLoading && children}
    </button>
  );

  // return !isLoading ? (
  //   <button disabled={isLoading} className={"btn " + className} {...props}>
  //     {!isLoading ? children : "loading..."}
  //   </button>
  // ) : (
  //   <div className="spinner-border" role="status">
  //     <span className="sr-only">Loading...</span>
  //   </div>
  // );
};

export default Button;
