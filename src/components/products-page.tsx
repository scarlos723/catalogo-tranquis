import { Link } from "react-router-dom"
import { useState } from "react"
import { prooducts } from "../data/products"

export function ProductsPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const formatCOP = (value: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(value)
  }

  return (
    <div className="min-h-screen bg-neutral-950 p-6 text-neutral-50 lg:p-8">
      <div className="mx-auto mb-12 max-w-7xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-5xl font-bold tracking-tight">
              Catálogo Tranquis
            </h1>
            <p className="mt-2 text-xl text-neutral-400">Precios de venta</p>
          </div>
          <Link
            to="/margen"
            className="rounded-lg bg-amber-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-amber-700"
          >
            Acceso Tranquis
          </Link>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4">
        {prooducts.map((product) => (
          <div
            key={product.id}
            className="overflow-hidden rounded-lg border border-neutral-800 bg-neutral-900 transition-colors hover:border-blue-600"
          >
            <div
              className="relative h-48 cursor-pointer overflow-hidden"
              onClick={() => setSelectedImage(product.image)}
            >
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
              />
              <div className="absolute top-3 right-3 rounded-full bg-blue-600 px-3 py-1 text-sm font-semibold text-white">
                {product.quantity} unidad{product.quantity > 1 ? "es" : ""}
              </div>
            </div>

            <div className="p-4">
              <h3 className="mb-1 text-lg font-bold">{product.name}</h3>
              <p className="mb-3 text-sm text-neutral-400">
                {product.description}
              </p>
              <div className="border-t border-neutral-800 pt-3">
                <p className="text-sm text-neutral-400">Precio Venta</p>
                <p className="text-2xl font-bold text-green-400">
                  {formatCOP(product.cop_sell_price)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-h-[90vh] max-w-[90vw] overflow-hidden rounded-lg">
            <img
              src={selectedImage}
              alt="Imagen ampliada"
              className="h-full w-full object-contain"
            />
          </div>
        </div>
      )}
    </div>
  )
}
