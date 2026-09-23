import { Routes, Route } from "react-router-dom";

import Home from "./pages/home/home";
import Login from "./pages/login/login";
import Dashboard from "./pages/dashboard/dashboard";
import Translate from "./pages/Translate/Translate";
import History from "./pages/history/history";
import Settings from "./pages/settings/settings";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/login" element={<Login />} />

      <Route path="/dashboard" element={<Dashboard />} />

      <Route path="/translate" element={<Translate />} />

      <Route path="/history" element={<History />} />
      

      <Route path="/settings" element={<Settings />} />
    </Routes>
  );
}

export default App;