import React, { forwardRef, useImperativeHandle, useState } from "react";
import { useExchangeRates } from "../../../contexts/exchange-rates.context";
import "./currency-input.styles.scss";

type CurrencyInputProps = {
  inputDirection: string;
  handleCurrencyInputChange: (value: {
    direction: string;
    value: string;
  }) => void;
  disabled?: boolean;
};

// This didn't work, using Any instead
// export type SelectRef = LegacyRef<HTMLSelectElement>;

function CurrencyInput(
  { inputDirection, handleCurrencyInputChange, disabled }: CurrencyInputProps,
  ref: any
) {
  const [selectedValue, setSelectedValue] = useState("");
  const { exchangeRates } = useExchangeRates();

  const currencyChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = e.target.value;
    setSelectedValue(newValue);
    handleCurrencyInputChange({
      direction: inputDirection,
      value: newValue,
    });
  };

  useImperativeHandle(ref, () => ({
    changeInputValue(value: string) {
      setSelectedValue(value);
    },
  }));

  return (
    <select
      ref={ref}
      className="currency-input"
      onChange={currencyChangeHandler}
      value={selectedValue}
      disabled={disabled}
    >
      <option></option>
      {exchangeRates.map(({ currency, rate }) => {
        return (
          <option key={currency} value={currency}>
            {currency}
          </option>
        );
      })}
    </select>
  );
}

export default forwardRef(CurrencyInput);
