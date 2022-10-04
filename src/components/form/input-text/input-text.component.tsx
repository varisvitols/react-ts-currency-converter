import React from "react";
import "./input-text.styles.scss";

type TextInputProps = {
  type?: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  style?: React.CSSProperties;
};

function TextInput(props: TextInputProps) {
  return <input {...props} className="input-text" />;
}

export default TextInput;
