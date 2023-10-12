import Header from "./Component/Header";
import InventoryPage from "./Page/InventoryPage";
import { Routes, Route } from "react-router-dom";
import "./styles.css";
import Sales from "./Page/SalesPage";
import Dashboaed from "./Page/Dashboard";

export default function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Dashboaed />} />
        <Route path="/inventory" element={<InventoryPage />} />
        <Route path="/sale" element={<Sales />} />
      </Routes>
    </div>
  );
}
