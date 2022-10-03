import { ReactElement } from "react";

import "./form-group.styles.scss";

type FormGroupProps = {
  label?: string;
  formElement: ReactElement;
};

function FormGroup({ label, formElement }: FormGroupProps) {
  return (
    <div className="form-group">
      {label && <label>{label}</label>}
      {formElement}
    </div>
  );
}

export default FormGroup;
