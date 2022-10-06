import {
  useState,
  createContext,
  useContext,
  ReactNode,
  useEffect,
} from "react";

// import { exchangeRatesURL } from "../config/ecb";

import ExchangRates from "../data/exchangeRates.json";

export type ExchangeRate = {
  currency: string;
  rate: number;
};

type SelectedCurrenciesBlueprint = {
  from: string;
  to: string;
};

export const defaultSelectedCurrencies: SelectedCurrenciesBlueprint = {
  from: "",
  to: "",
};

type ExchangeRatesContextBlueprint = {
  exchangeRates: ExchangeRate[];
  selectedCurrencies: SelectedCurrenciesBlueprint;
  setFromCurrency: (currencyCode: string) => void;
  setToCurrency: (currencyCode: string) => void;
};

type ProviderProps = {
  children: ReactNode;
};

const _setFromCurrency = (currency: string) => {
  const newSelectedCurrencies = (
    oldCurrencies: SelectedCurrenciesBlueprint
  ) => {
    return { from: currency, to: oldCurrencies.to };
  };

  return newSelectedCurrencies;
};

const _setToCurrency = (currency: string) => {
  const newSelectedCurrencies = (
    oldCurrencies: SelectedCurrenciesBlueprint
  ) => {
    return { from: oldCurrencies.from, to: currency };
  };

  return newSelectedCurrencies;
};

const ExchangeRatesContext = createContext({} as ExchangeRatesContextBlueprint);

export function useExchangeRates() {
  return useContext(ExchangeRatesContext);
}

export function ExchangeRatesProvider({ children }: ProviderProps) {
  const [exchangeRates, setExchangeRates] = useState<ExchangeRate[]>([]);
  const [selectedCurrencies, setSelectedCurrencies] =
    useState<SelectedCurrenciesBlueprint>(defaultSelectedCurrencies);

  useEffect(() => {
    const getExchangeRates = async () => {
      // const parser = new DOMParser();
      // const newExchangeRates = [] as ExchangeRate[];

      // try {
      //   const response = await fetch(exchangeRatesURL);
      //   const data = await response.text();
      //   const xml = parser.parseFromString(data, "application/xml");
      //   const elements = xml.getElementsByTagName("Cube");

      //   // Add EUR as the first element, as it's missing in the XML data from API
      //   newExchangeRates.push({
      //     currency: "EUR",
      //     rate: 1,
      //   });

      //   for (let i = 0; i < elements.length; i++) {
      //     const currency = elements[i].getAttribute("currency");
      //     const rate = elements[i].getAttribute("rate");

      //     if (!currency || !rate) continue;

      //     newExchangeRates.push({
      //       currency,
      //       rate: parseFloat(rate),
      //     });
      //   }

      //   console.log(newExchangeRates);
      // } catch (e) {
      //   alert(`Couldn't fetch exchange rates from server`);
      //   console.log(`Error fetching exchange rates from the server: ${e}`);
      // }

      setExchangeRates(ExchangRates);
    };

    getExchangeRates();
  }, []);

  const setFromCurrency = (currency: string) => {
    setSelectedCurrencies(_setFromCurrency(currency));
  };

  const setToCurrency = (currency: string) => {
    setSelectedCurrencies(_setToCurrency(currency));
  };

  const value = {
    exchangeRates,
    setFromCurrency,
    setToCurrency,
    selectedCurrencies,
  };
  return (
    <ExchangeRatesContext.Provider value={value}>
      {children}
    </ExchangeRatesContext.Provider>
  );
}
