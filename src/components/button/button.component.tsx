import "./button.styles.scss";

type ButtonProps = {
  type?: "button" | "submit" | "reset" | undefined;
  text: string;
  disabled?: boolean;
  style?: React.CSSProperties;
  onClick?: () => void;
};

function Button({
  type = "button",
  text,
  disabled = false,
  style,
  onClick,
}: ButtonProps) {
  return (
    <button
      className="button"
      disabled={disabled}
      type={type}
      style={style}
      onClick={onClick}
    >
      {text}
    </button>
  );
}

export default Button;
