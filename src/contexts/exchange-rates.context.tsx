import {
  useState,
  createContext,
  useContext,
  ReactNode,
  useEffect,
} from "react";

import { exchangeRatesURL } from "../config/ecb";

export type ExchangeRate = {
  currency: string;
  rate: number;
};

type SelectedCurrenciesBlueprint = {
  from: string;
  to: string;
};

const defaultSelectedCurrencies = {
  from: "",
  to: "",
};

type ExchangeRatesContextBlueprint = {
  exchangeRates: ExchangeRate[];
  selectedCurrencies: SelectedCurrenciesBlueprint;
  setFromCurrency: (currencyCode: string) => void;
  setToCurrency: (currencyCode: string) => void;
  swapCurrencies: () => void;
};

type ProviderProps = {
  children: ReactNode;
};

const ExchangeRatesContext = createContext({} as ExchangeRatesContextBlueprint);

function useExchangeRates() {
  return useContext(ExchangeRatesContext);
}

function ExchangeRatesProvider({ children }: ProviderProps) {
  const [exchangeRates, setExchangeRates] = useState<ExchangeRate[]>([]);
  const [selectedCurrencies, setSelectedCurrencies] =
    useState<SelectedCurrenciesBlueprint>(defaultSelectedCurrencies);

  useEffect(() => {
    console.log("get exchange rates");
    const getExchangeRates = async () => {
      const parser = new DOMParser();
      const newExchangeRates = [] as ExchangeRate[];

      try {
        const response = await fetch(exchangeRatesURL);
        const data = await response.text();
        const xml = parser.parseFromString(data, "application/xml");
        const elements = xml.getElementsByTagName("Cube");

        // Add EUR as the first element
        newExchangeRates.push({
          currency: "EUR",
          rate: 1,
        });

        for (let i = 0; i < elements.length; i++) {
          const currency = elements[i].getAttribute("currency");
          const rate = elements[i].getAttribute("rate");

          if (!currency || !rate) continue;

          newExchangeRates.push({
            currency,
            rate: parseFloat(rate),
          });
        }
      } catch (e) {
        alert(`Couldn't fetch exchange rates from server`);
        console.log(`Error fetching exchange rates from the server: ${e}`);
      }

      setExchangeRates(newExchangeRates);
    };

    getExchangeRates();
  }, []);

  // TODO: merge these 2 into one
  const setFromCurrency = (currency: string) => {
    const newSelectedCurrencies = (
      oldCurrencies: SelectedCurrenciesBlueprint
    ) => {
      return { from: currency, to: oldCurrencies.to };
    };
    setSelectedCurrencies(newSelectedCurrencies);
  };

  const setToCurrency = (currency: string) => {
    const newSelectedCurrencies = (
      oldCurrencies: SelectedCurrenciesBlueprint
    ) => {
      return { from: oldCurrencies.from, to: currency };
    };
    setSelectedCurrencies(newSelectedCurrencies);
  };

  const swapCurrencies = () => {
    //
  };

  return (
    <ExchangeRatesContext.Provider
      value={{
        exchangeRates,
        setFromCurrency,
        setToCurrency,
        swapCurrencies,
        selectedCurrencies,
      }}
    >
      {children}
    </ExchangeRatesContext.Provider>
  );
}

export { useExchangeRates, ExchangeRatesProvider, defaultSelectedCurrencies };
