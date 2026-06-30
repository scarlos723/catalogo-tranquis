import victoriaSale1 from "../assets/sales/victoria-2026-05-25-19-01-15.jpg"
import victoriaSale2 from "../assets/sales/victoria-2026-05-24-22-01-35.jpg"
import charlieSale1 from "../assets/sales/charlie-2026-05-26-08-46-01.jpg"
import panguSale1 from "../assets/sales/pangu--2026-05-24-16-07-10.jpg"
import sebasGordoSale1 from "../assets/sales/sebas-gordo-2026-06-04 at 16.15.50.jpeg"
import miloSale1 from "../assets/sales/milo-2026-05-16 at 18.56.14.jpeg"
import juancaSale from "../assets/sales/juanca_comprobante_2026-06-24.jpeg"
import kevisSale from "../assets/sales/kevin-sale-2026-07-28.jpeg"
export const sales_clients = [
  {
    id: 1,
    product_ids: [21],
    client_name: "Victoria",
    payment_proof: victoriaSale1,
    amount: 10000,
    state: "Pagado",
  },
  {
    id: 2,
    product_ids: [5],
    client_name: "Victoria",
    payment_proof: victoriaSale2,
    amount: 15000,
    state: "Pagado",
  },
  {
    id: 3,
    product_ids: [2, 12],
    client_name: "Charlie",
    payment_proof: charlieSale1,
    amount: 30000,
    state: "Pagado",
  },
  {
    id: 4,
    product_ids: [10],
    client_name: "Pangu",
    payment_proof: panguSale1,
    amount: 10000,
    state: "Pagado",
  },
  {
    id: 5,
    product_ids: [4],
    client_name: "Sebas Gordo",
    payment_proof: sebasGordoSale1,
    amount: 20000,
    state: "Pagado",
  },
  {
    id: 6,
    product_ids: [7, 14],
    client_name: "Milo",
    payment_proof: miloSale1,
    amount: 20000,
    state: "Pagado",
  },
  {
    id: 7,
    product_ids: [17],
    client_name: "Juan Ca Fractal",
    payment_proof: juancaSale,
    amount: 35000,
    state: "Pagado",
  },
  {
    id: 8,
    product_ids: [1],
    client_name: "Magda",
    payment_proof: null,
    amount: 10000,
    state: "Pendiente",
  },
  {
    id: 9,
    product_ids: [13],
    client_name: "Esteban",
    payment_proof: null,
    amount: 20000,
    state: "Pendiente",
  },
  {
    id: 10,
    product_ids: [3, 8],
    client_name: "Kevin Muños",
    payment_proof: kevisSale,
    amount: 20000,
    state: "Pagado",
  },
]
