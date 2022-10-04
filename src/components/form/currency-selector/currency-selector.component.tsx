import FormGroup from "../form-group/form-group.component";
import CurrencyInput from "../currency-input/currency-input.component";

import { ReactComponent as SwitchIcon } from "../../../assets/ico-switch.svg";
import "./currency-selector.styles.scss";
import { useRef, useState } from "react";
import { defaultSelectedCurrencies } from "../../../contexts/exchange-rates.context";

type CurrencySelectorProps = {
  handleCurrencySelectorChanges: (value: { from: string; to: string }) => void;
};

function CurrencySelector({
  handleCurrencySelectorChanges,
}: CurrencySelectorProps) {
  const [locallySelectedCurrencies, setLocallySelectedCurrencies] = useState(
    defaultSelectedCurrencies
  );

  // const selectRef = createRef<HTMLSelectElement>();
  const selectFromRef = useRef<any>();
  const selectToRef = useRef<any>();

  const handleChange = (changedCurrency: {
    direction: string;
    value: string;
  }) => {
    console.log("handle change in parent", changedCurrency);

    const newLocallySelectedCurrencies = { ...locallySelectedCurrencies };
    if (changedCurrency.direction === "from") {
      newLocallySelectedCurrencies.from = changedCurrency.value;
    }
    if (changedCurrency.direction === "to") {
      newLocallySelectedCurrencies.to = changedCurrency.value;
    }
    setLocallySelectedCurrencies(newLocallySelectedCurrencies);
    handleCurrencySelectorChanges(newLocallySelectedCurrencies);
  };

  const handleCurrencySwap = () => {
    selectFromRef.current.changeInputValue(locallySelectedCurrencies.to);
    selectToRef.current.changeInputValue(locallySelectedCurrencies.from);
    const newLocallySelectedCurrencies = {
      from: locallySelectedCurrencies.to,
      to: locallySelectedCurrencies.from,
    };
    setLocallySelectedCurrencies(newLocallySelectedCurrencies);
    handleCurrencySelectorChanges(newLocallySelectedCurrencies);
  };

  return (
    <div className="currency-selector">
      <FormGroup
        label="From"
        formElement={
          <CurrencyInput
            inputDirection="from"
            handleCurrencyInputChange={handleChange}
            ref={selectFromRef}
          />
        }
      />
      <button type="button" onClick={handleCurrencySwap}>
        <SwitchIcon className="switch-icon" />
      </button>
      <FormGroup
        label="To"
        formElement={
          <CurrencyInput
            inputDirection="to"
            handleCurrencyInputChange={handleChange}
            ref={selectToRef}
          />
        }
      />
    </div>
  );
}

export default CurrencySelector;
