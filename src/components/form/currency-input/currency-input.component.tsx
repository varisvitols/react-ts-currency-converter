import React from "react";
import { useExchangeRates } from "../../../contexts/exchange-rates.context";
import "./currency-input.styles.scss";

type CurrencyInputProps = {
  inputDirection: string;
  handleCurrencyInputChange: (value: {
    direction: string;
    value: string;
  }) => void;
};

function CurrencyInput({
  inputDirection,
  handleCurrencyInputChange,
}: CurrencyInputProps) {
  const { exchangeRates } = useExchangeRates();

  const currencyChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    handleCurrencyInputChange({
      direction: inputDirection,
      value: e.target.value,
    });
  };

  return (
    <select className="currency-input" onChange={currencyChangeHandler}>
      <option></option>
      {exchangeRates.map((item) => {
        return (
          <option key={item.currency} value={item.currency}>
            {item.currency}
          </option>
        );
      })}
    </select>
  );
}

export default CurrencyInput;
