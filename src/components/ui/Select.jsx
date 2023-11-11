import classes from "./Select.module.css";
export const Select = (props) => {
  const pageSpecificStyle = {
    width: props.width || "",
  };
  return (
    <div className={classes.main} style={pageSpecificStyle}>
      <select
        id={props.id}
        name={props.name}
        value={props.value}
        onChange={props.onChange}
        required={props.required}
      >
        <option value="" disabled>
          {props.selectedValue}
        </option>
        {props.data?.map((individualData) => {
          return (
            <option key={individualData} defaultValue={individualData}>
              {individualData}
            </option>
          );
        })}
      </select>
    </div>
  );
};
