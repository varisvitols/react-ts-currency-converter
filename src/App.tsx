import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./routes/home/home.component";
import Admin from "./routes/admin/admin.component";
import { exchangeRatesURL } from "./config/ecb";
import useLocalStorage from "./hooks/useLocalStorage.hook";

type ExchangeRate = {
  currency: string;
  rate: number;
};

function App() {
  const [exchangeRates, setExchangeRates] = useLocalStorage<ExchangeRate[]>(
    "exchange_rates",
    []
  );

  useEffect(() => {
    console.log("re-render app.js");
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

          // console.log(currency, rate);

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
    <Routes>
      <Route path="/">
        <Route index element={<Home />} />
        <Route path="/admin" element={<Admin />} />
      </Route>
    </Routes>
  );
}

export default App;
