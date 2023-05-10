import { useRef } from "react";
import "./tag.css";

export function Tag({ type, checked }: { type: string; checked?: boolean }) {
  const classNames = `tag tag--` + type;
  const radioRef = useRef<HTMLInputElement>(null);

  const clickRadioButton = () => {
    if (radioRef.current === null) return;
    radioRef.current.checked = true;
  };

  return (
    <span className="tag">
      <input
        type="radio"
        name="tagtype"
        id={type}
        value={type}
        ref={radioRef}
        defaultChecked={checked}
      ></input>
      <label htmlFor={type} className={classNames} onClick={clickRadioButton}>
        {type}
      </label>
    </span>
  );
}
