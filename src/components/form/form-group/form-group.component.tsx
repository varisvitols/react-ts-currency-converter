import { ReactElement } from "react";

import { FormGroupSC } from "./form-group.styles";

type FormGroupProps = {
  label?: string;
  formElement: ReactElement;
};

function FormGroup({ label, formElement }: FormGroupProps) {
  return (
    <FormGroupSC>
      {label && <label>{label}</label>}
      {formElement}
    </FormGroupSC>
  );
}

export default FormGroup;
