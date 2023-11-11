import classes from "./Label.module.css";
import { CgAsterisk } from "react-icons/cg";
export const Label = (props) => {
  const required = props.required || false;
  const style = {
    ...props.style,
    width: props.width || "",
  }
  const bold = props.bold ?? true;
  const color = props.color ?? "red"
  return (
    <label htmlFor={props.for} className={`${classes.title} ${props.className}`} style={style}>
      {bold ? <b>{props.title}</b> : <>{props.title}</>}
      {required && (
        <span style={{ color }} className={classes.asterisk}>
          <CgAsterisk />
        </span>
      )}
    </label>
  );
};
