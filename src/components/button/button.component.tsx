import "./button.styles.scss";

type ButtonProps = {
  type?: "button" | "submit" | "reset" | undefined;
  text: string;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
  onClick?: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    value?: any
  ) => void;
};

function Button({
  type = "button",
  text,
  disabled = false,
  style,
  className = "",
  onClick,
}: ButtonProps) {
  return (
    <button
      className={`button ${className}`}
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
