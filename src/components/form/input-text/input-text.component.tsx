import React, { MutableRefObject } from "react";
import "./input-text.styles.scss";

type TextInputProps = {
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

function TextInput(
  props: TextInputProps,
  ref: MutableRefObject<HTMLInputElement>
) {
  return <input {...props} ref={ref} className="input-text" />;
}

export default React.forwardRef(TextInput);
