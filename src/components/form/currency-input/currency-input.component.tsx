import React, {
  forwardRef,
  useImperativeHandle,
  useState,
  LegacyRef,
} from "react";
import { useExchangeRates } from "../../../contexts/exchange-rates.context";
import "./currency-input.styles.scss";

type CurrencyInputProps = {
  inputDirection: string;
  handleCurrencyInputChange: (value: {
    direction: string;
    value: string;
  }) => void;
};

// This didn't work, using Any instead
// export type SelectRef = LegacyRef<HTMLSelectElement>;

function CurrencyInput(
  { inputDirection, handleCurrencyInputChange }: CurrencyInputProps,
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
      console.log(`input value changed: ${value}`);
      setSelectedValue(value);
    },
  }));

  return (
    <select
      ref={ref}
      className="currency-input"
      onChange={currencyChangeHandler}
      value={selectedValue}
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
