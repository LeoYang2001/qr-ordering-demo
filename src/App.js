import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MenuPage from "./pages/MenuPage";
import CartPage from "./pages/CartPage";
import OrderSubmittedPage from "./pages/OrderSubmittedPage";
import "./App.css";
import DetailsPage from "./pages/DetailsPage";
import { AnimatePresence } from "framer-motion";

function App() {
  return (
    <Router>
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<MenuPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/order-submitted" element={<OrderSubmittedPage />} />
          <Route path="/details/:id" element={<DetailsPage />} />
        </Routes>
      </AnimatePresence>
    </Router>
  );
}

export default App;
