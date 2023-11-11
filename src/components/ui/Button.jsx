
const Button = (props) => {
  return (
    <div>
      <button
        className="button"
        type={props.type || "button"}
        onClick={props.onClick}
        disabled={props.disabled | false}
      >
        {props.children}
      </button>
    </div>
  );
};

export default Button;
