import React from "react";
import "./button.css";


export function Button({ className, text, onClick, type, isDisabled }: {
  text: string;
  type?: "submit" | "reset";
  className: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  isDisabled?: boolean
}) {
  const classNames = "btn " + className;
  return (
    <button className={classNames} type={type} onClick={onClick} disabled={isDisabled}>
      {text}{" "}
    </button>
  );
}
