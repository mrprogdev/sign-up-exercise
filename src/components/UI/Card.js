import "./Card.css";
import classNames from "classnames";

export const Card = (props) => {
  const cardClasses = classNames("card", props.className);

  return (
    <div className={cardClasses} style={props.style}>
      {props.children}
    </div>
  );
};
