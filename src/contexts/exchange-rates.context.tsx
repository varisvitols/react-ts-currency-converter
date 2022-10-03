import {
  useState,
  createContext,
  useContext,
  ReactNode,
  useEffect,
} from "react";

import { exchangeRatesURL } from "../config/ecb";

type ExchangeRate = {
  currency: string;
  rate: number;
};

type ExchangeRatesContextBlueprint = {
  exchangeRates: ExchangeRate[];
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

  return (
    <ExchangeRatesContext.Provider value={{ exchangeRates }}>
      {children}
    </ExchangeRatesContext.Provider>
  );
}

export { useExchangeRates, ExchangeRatesProvider };
