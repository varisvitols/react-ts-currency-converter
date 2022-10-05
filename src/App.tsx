import { Routes, Route } from "react-router-dom";

import { ExchangeRatesProvider } from "./contexts/exchange-rates.context";
import { FeesProvider } from "./contexts/fees.context";
import Navigation from "./routes/navigation/navigation.component";
import Home from "./routes/home/home.component";
import Admin from "./routes/admin/admin.component";

function App() {
  return (
    <ExchangeRatesProvider>
      <FeesProvider>
        <Routes>
          <Route path="/" element={<Navigation />}>
            <Route index element={<Home />} />
            <Route path="/admin" element={<Admin />} />
          </Route>
        </Routes>
      </FeesProvider>
    </ExchangeRatesProvider>
  );
}

export default App;
