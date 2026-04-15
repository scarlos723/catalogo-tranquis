import { X } from "lucide-react"
import { useMemo, useState } from "react"
import { prooducts } from "../data/products"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card"

export function ProductDashboard() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const delivery_guarantee = 3700
  const financialSummary = useMemo(() => {
    const activeProducts = prooducts.filter((p) => p.quantity > 0)

    const totalInvestment =
      activeProducts.reduce(
        (sum, p) => sum + p.cop_cost_price * p.quantity,
        0
      ) + delivery_guarantee

    const totalSalesProjection = activeProducts.reduce(
      (sum, p) => sum + p.cop_sell_price * p.quantity,
      0
    )

    const grossProfit = totalSalesProjection - totalInvestment
    const roi =
      totalInvestment > 0
        ? ((grossProfit / totalInvestment) * 100).toFixed(2)
        : "0.00"

    return {
      totalInvestment,
      totalSalesProjection,
      grossProfit,
      roi,
      itemCount: activeProducts.length,
      unitCount: activeProducts.reduce((sum, p) => sum + p.quantity, 0),
    }
  }, [])

  const formatCOP = (value: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(value)
  }

  return (
    <div className="min-h-screen bg-neutral-950 p-6 text-neutral-50 lg:p-8">
      {/* Header */}
      <div className="mx-auto mb-12 max-w-7xl">
        <div className="mb-2 space-y-3">
          <h1 className="text-5xl font-bold tracking-tight">
            Catálogo Tranquis
          </h1>
          <p className="text-lg text-neutral-400">
            Revisión de productos para aprobación de compra
          </p>
          <code>
            <span>Criterios de busqueda de productos :</span>
            <span>Anime, Pines, Expansores 12mm, Medias Skate, Lapiceros</span>
          </code>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Main Content */}
        <div className="space-y-6 lg:col-span-2">
          {/* Products Gallery */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Productos Disponibles</h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {prooducts.map((product) => {
                const totalCost = product.cop_cost_price * product.quantity
                const totalSell = product.cop_sell_price * product.quantity
                const marginValue = totalSell - totalCost
                const marginPercent =
                  totalCost > 0
                    ? ((marginValue / totalCost) * 100).toFixed(1)
                    : "0.0"

                return (
                  <Card
                    key={product.id}
                    className={`overflow-hidden border-neutral-800 bg-neutral-900 transition-colors hover:border-blue-600`}
                  >
                    {/* Product Image */}
                    <div className="relative h-48 overflow-hidden bg-neutral-800">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full cursor-pointer object-cover transition-transform duration-300 hover:scale-105"
                        onClick={() => setSelectedImage(product.image)}
                      />
                      <div className="absolute top-3 right-3 rounded-full bg-blue-600 px-3 py-1 text-sm font-semibold text-white">
                        {product.quantity} unidad
                        {product.quantity > 1 ? "es" : ""}
                      </div>
                    </div>

                    <CardContent className="space-y-4 p-4">
                      {/* Product Name & Description */}
                      <div>
                        <h3 className="mb-1 text-lg font-bold">
                          {product.name}
                        </h3>
                        <p className="text-sm text-neutral-400">
                          {product.description}
                        </p>
                      </div>

                      {/* Pricing */}
                      <div className="space-y-2 border-t border-neutral-800 pt-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-neutral-400">
                            Precio Compra Unit.
                          </span>
                          <span className="font-semibold">
                            {formatCOP(product.cop_cost_price)}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-neutral-400">
                            Precio Venta Unit.
                          </span>
                          <span className="font-semibold text-green-400">
                            {formatCOP(product.cop_sell_price)}
                          </span>
                        </div>
                        <div className="mt-2 flex justify-between border-t border-neutral-800 pt-2 text-sm">
                          <span className="text-neutral-400">Total Compra</span>
                          <span className="font-semibold">
                            {formatCOP(totalCost)}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-neutral-400">Total Venta</span>
                          <span className="font-semibold text-green-400">
                            {formatCOP(totalSell)}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-neutral-400">Margen</span>
                          <span className="font-semibold text-amber-400">
                            {formatCOP(marginValue)} ({marginPercent}%)
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </div>

        {/* Sidebar - Financial Summary */}
        <div className="space-y-6">
          <div className="sticky top-8">
            <Card className="border-neutral-800 bg-linear-to-br from-neutral-900 to-neutral-950 shadow-2xl">
              <CardHeader>
                <CardTitle>Resumen Financiero</CardTitle>
                <CardDescription>
                  {financialSummary.itemCount} tipos •{" "}
                  {financialSummary.unitCount} unidades
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <p className="text-sm font-semibold tracking-wide text-neutral-400 uppercase">
                    Delivery Guarantee
                  </p>
                  <p className="text-3xl font-bold text-purple-400">
                    {formatCOP(delivery_guarantee)}
                  </p>
                </div>
                {/* Investment */}
                <div className="space-y-2">
                  <p className="text-sm font-semibold tracking-wide text-neutral-400 uppercase">
                    Inversión Total
                  </p>
                  <p className="text-3xl font-bold text-red-400">
                    {formatCOP(financialSummary.totalInvestment)}
                  </p>
                </div>

                {/* Sales Projection */}
                <div className="space-y-2 border-t border-neutral-800 pt-4">
                  <p className="text-sm font-semibold tracking-wide text-neutral-400 uppercase">
                    Proyección de Ventas
                  </p>
                  <p className="text-3xl font-bold text-green-400">
                    {formatCOP(financialSummary.totalSalesProjection)}
                  </p>
                </div>

                {/* Gross Profit */}
                <div className="space-y-2 border-t border-neutral-800 pt-4">
                  <p className="text-sm font-semibold tracking-wide text-neutral-400 uppercase">
                    Ganancia Bruta Estimada
                  </p>
                  <p className="text-3xl font-bold text-amber-400">
                    {formatCOP(financialSummary.grossProfit)}
                  </p>
                </div>

                {/* ROI */}
                <div className="space-y-2 rounded-lg border-t border-neutral-800 bg-neutral-800 p-4 pt-4">
                  <p className="text-sm font-semibold tracking-wide text-neutral-400 uppercase">
                    ROI (Retorno de Inversión)
                  </p>
                  <p className="text-4xl font-bold text-blue-400">
                    {financialSummary.roi}%
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Image Modal */}
            {selectedImage && (
              <div
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
                onClick={() => setSelectedImage(null)}
              >
                <div
                  className="relative max-h-[90vh] max-w-[90vw] overflow-hidden rounded-lg"
                  onClick={(e) => e.stopPropagation()}
                >
                  <img
                    src={selectedImage}
                    alt="Imagen ampliada"
                    className="h-full w-full object-contain"
                  />
                  <button
                    onClick={() => setSelectedImage(null)}
                    className="absolute top-4 right-4 rounded-full bg-neutral-950/80 p-2 text-white transition-colors hover:bg-neutral-950"
                  >
                    <X className="size-6" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
