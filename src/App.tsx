import { BrowserRouter, Route, Routes } from "react-router-dom"
import { ProductsPage } from "./components/products-page"
import { MargenPage } from "./components/margen-page"
import { SalesPage } from "./components/sales-page"
import { ProtectedLayout } from "./components/protected-layout"

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProductsPage />} />
        <Route element={<ProtectedLayout />}>
          <Route path="/margen" element={<MargenPage />} />
          <Route path="/sales" element={<SalesPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
