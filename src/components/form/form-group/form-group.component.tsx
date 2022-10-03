import { ReactElement } from "react";

function FormGroup({
  label,
  formElement,
}: {
  label?: string;
  formElement: ReactElement;
}) {
  return (
    <div className="form-group">
      {label && <label>{label}</label>}
      {formElement}
    </div>
  );
}

export default FormGroup;
