import { useMemo, useState } from "react";
import TextInput from "../../components/form/input-text/input-text.component";
import FormGroup from "../../components/form/form-group/form-group.component";
import CurrencySelector from "../../components/form/currency-selector/currency-selector.component";
import { useExchangeRates } from "../../contexts/exchange-rates.context";
import { useFees } from "../../contexts/fees.context";
import { defaultExchangeFee } from "../../config/exchange-fee";

import "./home.styles.scss";

function Home() {
  const [amount, setAmount] = useState("");
  const { exchangeRates, selectedCurrencies, setFromCurrency, setToCurrency } =
    useExchangeRates();
  const { fees } = useFees();

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setAmount(e.target.value);
  };

  const formSubmitHandler = (e: React.SyntheticEvent): void => {
    e.preventDefault();
  };

  const handleCurrencySelectorChanges = (value: {
    from: string;
    to: string;
  }) => {
    setFromCurrency(value.from);
    setToCurrency(value.to);
  };

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

  const exchangeResult = (() => {
    const amountNumber = parseFloat(amount);
    if (!amountNumber || !exchangeRate) return 0;
    return (amountNumber - amountNumber * exchangeFee) * exchangeRate;
  })();

  const conversionResultsAvailable =
    !!selectedCurrencies.from && !!selectedCurrencies.to && !!amount;

  return (
    <div>
      <h1 className="page-heading ta-center">Simple Currency Converter</h1>
      <div className="page-content">
        <div className="sub-heading ta-center">Exchange Rate</div>
        <div className="rate ta-center">{exchangeRate.toFixed(4)}</div>
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
        </form>
        {conversionResultsAvailable && (
          <div className="exchange-result">
            <div className="sub-heading ta-center">Exchange Result</div>
            <div className="rate ta-center">
              {`${exchangeResult.toFixed(2)} ${selectedCurrencies.to}`}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
