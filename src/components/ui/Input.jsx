import React from "react";
import classes from "./Input.module.css";

export const Input = React.forwardRef((props, ref) => {
  const pageSpecificStyle = {
    width: props.width || "",
    marginBottom: props.marginBottom || "",
  };
  const min = props.min ?? 0;
  const max = props.max ?? Number.POSITIVE_INFINITY;
  const step = props.step ?? 1;
  return (
    <div className={classes.main} style={pageSpecificStyle}>
      <input
        type={props.type || "text"}
        value={props.value}
        defaultValue={props.defaultValue}
        onChange={props.onChange}
        id={props.id}
        ref={ref}
        name={props.name}
        readOnly={props.readOnly || false}
        required={props.required || false}
        disabled={props.disabled || false}
        placeholder={props.placeholder}
        {...(props.type === "number" ? { min, max, step} : {})}
      />
    </div>
  );
});
