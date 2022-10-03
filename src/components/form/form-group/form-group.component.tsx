import { MutableRefObject, ReactElement, ReactNode, useRef } from "react";

function FormGroup({
  label,
  formElement,
  inputRef,
}: {
  label?: string;
  formElement: ReactElement;
  inputRef?: MutableRefObject<HTMLInputElement>;
}) {
  // const inputRef = useRef(null);
  console.log(inputRef);
  const onLabelClickHandler = () => {
    if (inputRef && typeof inputRef != "string")
      (inputRef as MutableRefObject<HTMLInputElement>).current.focus();
  };
  return (
    <div className="form-group">
      {label && <label>{label}</label>}
      {formElement}
    </div>
  );
}

export default FormGroup;
