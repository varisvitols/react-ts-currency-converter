import FormGroup from "../form-group/form-group.component";
import CurrencyInput from "../currency-input/currency-input.component";

import { ReactComponent as SwitchIcon } from "../../../assets/ico-switch.svg";
import "./currency-selector.styles.scss";
import { useEffect, useRef, useState } from "react";
import { defaultSelectedCurrencies } from "../../../contexts/exchange-rates.context";

type CurrencySelectorProps = {
  preselectedValues: { from: string; to: string };
  handleCurrencySelectorChanges: (value: { from: string; to: string }) => void;
  currencyEditDisabled?: boolean;
};

function CurrencySelector({
  preselectedValues,
  handleCurrencySelectorChanges,
  currencyEditDisabled,
}: CurrencySelectorProps) {
  const [locallySelectedCurrencies, setLocallySelectedCurrencies] = useState(
    defaultSelectedCurrencies
  );
  const selectFromRef = useRef<any>();
  const selectToRef = useRef<any>();

  useEffect(() => {
    setLocallySelectedCurrencies(preselectedValues);
  }, [preselectedValues]);

  useEffect(() => {
    selectFromRef.current.changeInputValue(locallySelectedCurrencies.from);
    selectToRef.current.changeInputValue(locallySelectedCurrencies.to);
  }, [locallySelectedCurrencies]);

  const handleChange = (changedCurrency: {
    direction: string;
    value: string;
  }) => {
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
            disabled={currencyEditDisabled}
            ref={selectFromRef}
          />
        }
      />
      <FormGroup
        formElement={
          <button
            type="button"
            onClick={handleCurrencySwap}
            disabled={currencyEditDisabled}
            style={{ marginTop: "auto" }}
          >
            <SwitchIcon className="switch-icon" />
          </button>
        }
      />

      <FormGroup
        label="To"
        formElement={
          <CurrencyInput
            inputDirection="to"
            handleCurrencyInputChange={handleChange}
            disabled={currencyEditDisabled}
            ref={selectToRef}
          />
        }
      />
    </div>
  );
}

export default CurrencySelector;
