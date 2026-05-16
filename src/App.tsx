import { BrowserRouter, Route, Routes } from "react-router-dom"
import { ProductsPage } from "./components/products-page"
import { MargenPage } from "./components/margen-page"

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProductsPage />} />
        <Route path="/margen" element={<MargenPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App