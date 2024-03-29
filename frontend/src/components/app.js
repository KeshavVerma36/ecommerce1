import { BrowserRouter, Route, Routes } from "react-router-dom";
import CartPage from './pages/cart';
import Home from './pages/home';
import Navbar from "./pages/navbar";
import ProductDetail from "./pages/detailed";
import BuyPage from "./pages/buyPage";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />  
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/api/products/:id" element={<ProductDetail />} />
          <Route path="/api/buy/:id" element={<BuyPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
