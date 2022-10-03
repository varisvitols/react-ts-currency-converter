import FormGroup from "../form-group/form-group.component";
import CurrencyInput from "../currency-input/currency-input.component";

import { ReactComponent as SwitchIcon } from "../../../assets/ico-switch.svg";
import "./currency-switcher.styles.scss";

function CurrencySwitcher() {
  return (
    <div className="currency-switcher">
      <FormGroup label="From" formElement={<CurrencyInput />} />
      <button>
        <SwitchIcon className="switch-icon" />
      </button>
      <FormGroup label="To" formElement={<CurrencyInput />} />
    </div>
  );
}

export default CurrencySwitcher;
