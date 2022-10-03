import { Routes, Route } from "react-router-dom";

import { ExchangeRatesProvider } from "./contexts/exchange-rates.context";
import Navigation from "./routes/navigation/navigation.component";
import Home from "./routes/home/home.component";
import Admin from "./routes/admin/admin.component";

function App() {
  return (
    <ExchangeRatesProvider>
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route index element={<Home />} />
          <Route path="/admin" element={<Admin />} />
        </Route>
      </Routes>
    </ExchangeRatesProvider>
  );
}

export default App;
