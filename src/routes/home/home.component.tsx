import { useEffect, useMemo, useState } from "react";
import TextInput from "../../components/form/input-text/input-text.component";

import Button from "../../components/button/button.component";
import FormGroup from "../../components/form/form-group/form-group.component";
import CurrencySelector from "../../components/form/currency-selector/currency-selector.component";
import { useExchangeRates } from "../../contexts/exchange-rates.context";
import { FeeRecord, useFees } from "../../contexts/fees.context";
import { defaultExchangeFee } from "../../config/exchange-fee";

function Home() {
  const [amount, setAmount] = useState("");
  const { exchangeRates, selectedCurrencies, setFromCurrency, setToCurrency } =
    useExchangeRates();
  const { fees } = useFees();

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    console.log(e.target.value);
    setAmount(e.target.value);
  };

  const formSubmitHandler = (e: React.SyntheticEvent): void => {
    e.preventDefault();
    console.log("form submit");
  };

  const handleCurrencySelectorChanges = (value: {
    from: string;
    to: string;
  }) => {
    console.log("handle changes in home component: ", value);
    setFromCurrency(value.from);
    setToCurrency(value.to);
  };

  useEffect(() => {
    console.log("selectedCurrencies changed", selectedCurrencies);
  }, [selectedCurrencies]);

  const exchangeRate = useMemo((): number => {
    const selectedFrom = exchangeRates.find(
      (item) => item.currency === selectedCurrencies.from
    );
    const selectedTo = exchangeRates.find(
      (item) => item.currency === selectedCurrencies.to
    );

    if (!selectedTo || !selectedFrom) return 0;

    const baseRate = selectedTo.rate / selectedFrom.rate;

    return baseRate;
  }, [selectedCurrencies, exchangeRates]);

  const exchangeFee = useMemo(() => {
    const { from, to } = selectedCurrencies;
    const feeId = `${from}_${to}`;
    const feeRecord = fees.find((item) => item.id === feeId);

    return feeRecord ? feeRecord.fee : defaultExchangeFee;
  }, [fees, selectedCurrencies]);

  const exchangeResult = useMemo(() => {
    const amountNumber = parseFloat(amount);
    if (!amountNumber || !exchangeRate) return 0;
    return (amountNumber - amountNumber * exchangeFee) * exchangeRate;
  }, [amount, exchangeRate, exchangeFee]);

  const convertButtonDisabled = useMemo((): boolean => {
    return !selectedCurrencies.from || !selectedCurrencies.to || !amount;
  }, [amount, selectedCurrencies]);

  return (
    <div>
      <h1 className="section-heading ta-center">Simple Currency Converter</h1>
      <div className="section-content">
        <div className="sub-heading ta-center">Exchange Rate</div>
        <div className="rate ta-center">{exchangeRate}</div>
        <div className="sub-heading ta-center">Conversion Fee</div>
        <div className="rate ta-center">{exchangeFee * 100}%</div>

        <form onSubmit={formSubmitHandler}>
          <FormGroup
            label="Amount"
            formElement={
              <TextInput
                type="number"
                value={amount}
                onChange={inputChangeHandler}
              />
            }
          />

          <CurrencySelector
            handleCurrencySelectorChanges={handleCurrencySelectorChanges}
            preselectedValues={{ ...selectedCurrencies }}
          />

          <FormGroup
            formElement={
              <Button
                type="submit"
                text="Convert"
                disabled={convertButtonDisabled}
              />
            }
          />
        </form>

        <div className="exchange-result">{exchangeResult}</div>
      </div>
    </div>
  );
}

export default Home;
