import { Routes, Route } from "react-router-dom";

import Home from "./routes/home/home.component";
import Admin from "./routes/admin/admin.component";

function App() {
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
