import "./button.styles.scss";

type ButtonProps = {
  type?: "button" | "submit" | "reset" | undefined;
  text: string;
  disabled?: boolean;
};

function Button({ type = "button", text, disabled = false }: ButtonProps) {
  return (
    <button className="button" disabled={disabled} type={type}>
      {text}
    </button>
  );
}

export default Button;
