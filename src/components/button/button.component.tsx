import "./button.styles.scss";

type ButtonProps = {
  type?: "button" | "submit" | "reset" | undefined;
  text: string;
};

function Button({ type = "button", text }: ButtonProps) {
  return (
    <button className="button" type={type}>
      {text}
    </button>
  );
}

export default Button;
