import { useMemo, useState } from "react"
import {
  CircleCheckBig,
  Clock,
  ImageOff,
  TrendingDown,
  TrendingUp,
  Wallet,
  X,
} from "lucide-react"
import { prooducts } from "@/data/products"
import { sales_clients } from "@/data/sales"
import { formatCOP } from "@/lib/formatCop"
import { cn } from "@/lib/utils"

type SaleState = "Pagado" | "Pendiente"

type Product = (typeof prooducts)[number]

export const SalesPage = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const { total, debt, paidCount, pendingCount, totalCount, collectionRate } =
    useMemo(() => {
      let totalPaid = 0
      let totalDebt = 0
      let paid = 0
      let pending = 0

      for (const sale of sales_clients) {
        if (sale.state === "Pagado") {
          totalPaid += sale.amount
          paid += 1
        } else if (sale.state === "Pendiente") {
          totalDebt += sale.amount
          pending += 1
        }
      }

      const grandTotal = totalPaid + totalDebt
      const rate = grandTotal > 0 ? (totalPaid / grandTotal) * 100 : 0

      return {
        total: totalPaid,
        debt: totalDebt,
        paidCount: paid,
        pendingCount: pending,
        totalCount: sales_clients.length,
        collectionRate: rate,
      }
    }, [])

  const paidSales = sales_clients.filter((s) => s.state === "Pagado")
  const pendingSales = sales_clients.filter((s) => s.state === "Pendiente")

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-50">
      <div className="mx-auto max-w-7xl space-y-10 px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
        <SalesHeader totalCount={totalCount} />

        <section
          aria-label="Resumen financiero"
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          <KpiCard
            label="Total cobrado"
            value={formatCOP(total)}
            sub={`${paidCount} ventas pagadas`}
            icon={<TrendingUp className="size-4" />}
            accent="emerald"
            progress={collectionRate}
          />
          <KpiCard
            label="Por cobrar"
            value={formatCOP(debt)}
            sub={`${pendingCount} ventas pendientes`}
            icon={<TrendingDown className="size-4" />}
            accent="amber"
            progress={100 - collectionRate}
          />
          <KpiCard
            label="Flujo total"
            value={formatCOP(total + debt)}
            sub={`${totalCount} ventas registradas`}
            icon={<Wallet className="size-4" />}
            accent="neutral"
          />
          <CollectionRateCard rate={collectionRate} />
        </section>

        <SalesSection
          title="Ventas pagadas"
          description="Ingresos confirmados con comprobante"
          amount={total}
          count={paidCount}
          state="Pagado"
          sales={paidSales}
          onImageClick={setSelectedImage}
        />

        <SalesSection
          title="Ventas pendientes"
          description="Clientes con saldo a favor"
          amount={debt}
          count={pendingCount}
          state="Pendiente"
          sales={pendingSales}
          onImageClick={setSelectedImage}
        />
      </div>

      {selectedImage && (
        <ImageLightbox
          src={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </main>
  )
}

const SalesHeader = ({ totalCount }: { totalCount: number }) => (
  <header className="space-y-3">
    <div className="flex items-center gap-2">
      <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-medium tracking-wide text-emerald-300 uppercase">
        <span className="size-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px] shadow-emerald-400/60" />
        Libro de ventas
      </span>
      <span className="text-xs text-neutral-500">{totalCount} registros</span>
    </div>
    <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
      Panel de ventas
    </h1>
    <p className="max-w-2xl text-sm text-neutral-400 sm:text-base">
      Control de lo que entró a caja, lo que deben y el progreso de cobro de
      cada cliente.
    </p>
  </header>
)

type KpiAccent = "emerald" | "amber" | "neutral" | "blue"

const accentStyles: Record<
  KpiAccent,
  {
    ring: string
    iconBg: string
    iconText: string
    valueText: string
    progressFrom: string
    progressTo: string
  }
> = {
  emerald: {
    ring: "ring-emerald-500/15",
    iconBg: "bg-emerald-500/10",
    iconText: "text-emerald-400",
    valueText: "text-emerald-300",
    progressFrom: "from-emerald-500",
    progressTo: "to-emerald-300",
  },
  amber: {
    ring: "ring-amber-500/15",
    iconBg: "bg-amber-500/10",
    iconText: "text-amber-400",
    valueText: "text-amber-300",
    progressFrom: "from-amber-500",
    progressTo: "to-orange-400",
  },
  neutral: {
    ring: "ring-white/10",
    iconBg: "bg-white/5",
    iconText: "text-neutral-300",
    valueText: "text-white",
    progressFrom: "from-neutral-500",
    progressTo: "to-neutral-300",
  },
  blue: {
    ring: "ring-blue-500/15",
    iconBg: "bg-blue-500/10",
    iconText: "text-blue-400",
    valueText: "text-blue-300",
    progressFrom: "from-blue-500",
    progressTo: "to-cyan-400",
  },
}

const KpiCard = ({
  label,
  value,
  sub,
  icon,
  accent,
  progress,
}: {
  label: string
  value: string
  sub: string
  icon: React.ReactNode
  accent: KpiAccent
  progress?: number
}) => {
  const styles = accentStyles[accent]
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-2xl bg-neutral-900 p-5 ring-1",
        styles.ring
      )}
    >
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute -top-16 -right-16 size-40 rounded-full bg-gradient-to-br opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-30",
          styles.progressFrom,
          styles.progressTo
        )}
      />
      <div className="relative space-y-4">
        <div className="flex items-start justify-between">
          <p className="text-[11px] font-semibold tracking-[0.18em] text-neutral-500 uppercase">
            {label}
          </p>
          <span
            className={cn(
              "inline-flex size-8 items-center justify-center rounded-lg",
              styles.iconBg,
              styles.iconText
            )}
          >
            {icon}
          </span>
        </div>
        <p
          className={cn(
            "text-2xl font-bold tracking-tight sm:text-3xl",
            styles.valueText
          )}
        >
          {value}
        </p>
        <div className="flex items-center justify-between gap-3">
          <p className="text-xs text-neutral-500">{sub}</p>
          {typeof progress === "number" && (
            <span className="text-xs font-semibold text-neutral-400 tabular-nums">
              {progress.toFixed(0)}%
            </span>
          )}
        </div>
        {typeof progress === "number" && (
          <div className="h-1 w-full overflow-hidden rounded-full bg-neutral-800">
            <div
              className={cn(
                "h-full rounded-full bg-gradient-to-r transition-[width] duration-700",
                styles.progressFrom,
                styles.progressTo
              )}
              style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
            />
          </div>
        )}
      </div>
    </div>
  )
}

const CollectionRateCard = ({ rate }: { rate: number }) => {
  const clamped = Math.min(100, Math.max(0, rate))
  const radius = 38
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (clamped / 100) * circumference

  return (
    <div className="group relative overflow-hidden rounded-2xl bg-neutral-900 p-5 ring-1 ring-blue-500/15">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-16 -right-16 size-40 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-30"
      />
      <div className="relative flex items-center gap-5">
        <div className="relative size-24 shrink-0">
          <svg viewBox="0 0 100 100" className="size-24 -rotate-90" aria-hidden>
            <circle
              cx="50"
              cy="50"
              r={radius}
              className="fill-none stroke-neutral-800"
              strokeWidth="8"
            />
            <circle
              cx="50"
              cy="50"
              r={radius}
              className="fill-none stroke-blue-400 transition-[stroke-dashoffset] duration-700"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-base font-bold text-blue-300 tabular-nums">
              {clamped.toFixed(0)}%
            </span>
          </div>
        </div>
        <div className="space-y-1">
          <p className="text-[11px] font-semibold tracking-[0.18em] text-neutral-500 uppercase">
            Tasa de cobro
          </p>
          <p className="text-sm leading-snug text-neutral-300">
            Del total facturado, se ha recibido{" "}
            <span className="font-semibold text-blue-300">
              {clamped.toFixed(0)}%
            </span>
            .
          </p>
        </div>
      </div>
    </div>
  )
}

const SalesSection = ({
  title,
  description,
  amount,
  count,
  state,
  sales,
  onImageClick,
}: {
  title: string
  description: string
  amount: number
  count: number
  state: SaleState
  sales: typeof sales_clients
  onImageClick: (src: string) => void
}) => {
  const isPaid = state === "Pagado"
  return (
    <section
      aria-label={title}
      className="overflow-hidden rounded-2xl bg-neutral-900/60 ring-1 ring-white/5"
    >
      <div className="flex flex-col gap-4 border-b border-white/5 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div className="flex items-start gap-3">
          <div
            className={cn(
              "inline-flex size-10 items-center justify-center rounded-xl",
              isPaid
                ? "bg-emerald-500/10 text-emerald-400"
                : "bg-amber-500/10 text-amber-400"
            )}
          >
            {isPaid ? (
              <CircleCheckBig className="size-5" />
            ) : (
              <Clock className="size-5" />
            )}
          </div>
          <div>
            <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
            <p className="text-sm text-neutral-500">{description}</p>
          </div>
        </div>
        <div className="flex items-center gap-6 sm:gap-8">
          <Stat label="Ventas" value={count.toString()} />
          <div className="h-10 w-px bg-white/5" />
          <Stat
            label="Subtotal"
            value={formatCOP(amount)}
            tone={isPaid ? "emerald" : "amber"}
          />
        </div>
      </div>

      {sales.length === 0 ? (
        <EmptyState state={state} />
      ) : (
        <ul className="divide-y divide-white/5">
          {sales.map((sale) => (
            <SaleRow key={sale.id} sale={sale} onImageClick={onImageClick} />
          ))}
        </ul>
      )}
    </section>
  )
}

const Stat = ({
  label,
  value,
  tone = "neutral",
}: {
  label: string
  value: string
  tone?: "neutral" | "emerald" | "amber"
}) => (
  <div className="space-y-0.5 text-right">
    <p className="text-[10px] font-semibold tracking-[0.18em] text-neutral-500 uppercase">
      {label}
    </p>
    <p
      className={cn(
        "text-lg font-bold tabular-nums",
        tone === "emerald" && "text-emerald-300",
        tone === "amber" && "text-amber-300",
        tone === "neutral" && "text-white"
      )}
    >
      {value}
    </p>
  </div>
)

const SaleRow = ({
  sale,
  onImageClick,
}: {
  sale: (typeof sales_clients)[number]
  onImageClick: (src: string) => void
}) => {
  const isPaid = sale.state === "Pagado"
  const products = sale.product_ids
    .map((id) => prooducts.find((p) => p.id === id))
    .filter((p): p is Product => Boolean(p))

  return (
    <li className="group transition-colors hover:bg-white/[0.02]">
      <div className="grid grid-cols-1 gap-4 p-5 sm:p-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,2fr)_auto] lg:items-center">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() =>
              sale.payment_proof ? onImageClick(sale.payment_proof) : undefined
            }
            disabled={!sale.payment_proof}
            aria-label={
              sale.payment_proof
                ? `Ver comprobante de ${sale.client_name}`
                : `Sin comprobante de ${sale.client_name}`
            }
            className={cn(
              "relative size-14 shrink-0 overflow-hidden rounded-xl ring-1 transition",
              sale.payment_proof
                ? "cursor-zoom-in ring-white/10 hover:ring-blue-400/60"
                : "ring-dashed cursor-not-allowed ring-white/10"
            )}
          >
            {sale.payment_proof ? (
              <img
                src={sale.payment_proof}
                alt={`Comprobante de ${sale.client_name}`}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-neutral-800 text-neutral-600">
                <ImageOff className="size-5" />
              </div>
            )}
            <div
              aria-hidden
              className={cn(
                "absolute inset-0 bg-gradient-to-t from-black/40 to-transparent transition-opacity",
                sale.payment_proof
                  ? "opacity-60 group-hover:opacity-30"
                  : "opacity-0"
              )}
            />
          </button>

          <div className="min-w-0">
            <p className="truncate text-base font-semibold text-white">
              {sale.client_name}
            </p>
            <p className="text-xs text-neutral-500">
              {products.length}{" "}
              {products.length === 1 ? "producto" : "productos"} · Ref #
              {sale.id}
            </p>
          </div>
        </div>

        <ProductsBar products={products} />

        <div className="flex items-center justify-between gap-3 lg:justify-end">
          <span
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold tracking-wide uppercase",
              isPaid
                ? "bg-emerald-500/10 text-emerald-300 ring-1 ring-emerald-500/20"
                : "bg-amber-500/10 text-amber-300 ring-1 ring-amber-500/20"
            )}
          >
            <span
              className={cn(
                "size-1.5 rounded-full",
                isPaid ? "bg-emerald-400" : "bg-amber-400"
              )}
            />
            {sale.state}
          </span>
          <p
            className={cn(
              "text-lg font-bold tabular-nums sm:text-xl",
              isPaid ? "text-emerald-300" : "text-amber-300"
            )}
          >
            {formatCOP(sale.amount)}
          </p>
        </div>
      </div>
    </li>
  )
}

const ProductsBar = ({ products }: { products: Product[] }) => {
  if (products.length === 0) {
    return (
      <p className="text-xs text-neutral-500 italic">Sin productos asociados</p>
    )
  }

  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-1 [scrollbar-width:thin]">
      {products.map((p, idx) => (
        <div
          key={`${p.id}-${idx}`}
          className="group/chip relative flex shrink-0 items-center gap-2 rounded-full bg-neutral-800/70 py-1 pr-3 pl-1 ring-1 ring-white/5"
        >
          <span className="relative size-7 overflow-hidden rounded-full bg-neutral-700 ring-1 ring-white/10">
            <img
              src={p.image}
              alt={p.name}
              className="h-full w-full object-cover"
            />
          </span>
          <span className="max-w-[180px] truncate text-xs font-medium text-neutral-200">
            {p.name}
          </span>
        </div>
      ))}
    </div>
  )
}

const EmptyState = ({ state }: { state: SaleState }) => {
  const isPaid = state === "Pagado"
  return (
    <div className="flex flex-col items-center gap-2 px-6 py-12 text-center">
      <div
        className={cn(
          "inline-flex size-12 items-center justify-center rounded-2xl",
          isPaid
            ? "bg-emerald-500/10 text-emerald-400"
            : "bg-amber-500/10 text-amber-400"
        )}
      >
        {isPaid ? (
          <CircleCheckBig className="size-6" />
        ) : (
          <Clock className="size-6" />
        )}
      </div>
      <p className="text-sm font-medium text-neutral-300">
        {isPaid
          ? "Aún no registras ventas pagadas"
          : "No tienes ventas pendientes. ¡Bien hecho!"}
      </p>
      <p className="text-xs text-neutral-500">
        {isPaid
          ? "Cuando lleguen pagos, aparecerán aquí."
          : "Cuando alguien te deba, aparecerá aquí."}
      </p>
    </div>
  )
}

const ImageLightbox = ({
  src,
  onClose,
}: {
  src: string
  onClose: () => void
}) => (
  <div
    className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
    onClick={onClose}
  >
    <div
      className="relative max-h-[90vh] max-w-[90vw] overflow-hidden rounded-2xl ring-1 ring-white/10"
      onClick={(e) => e.stopPropagation()}
    >
      <img
        src={src}
        alt="Comprobante de pago ampliado"
        className="h-full w-full object-contain"
      />
      <button
        type="button"
        onClick={onClose}
        aria-label="Cerrar imagen"
        className="absolute top-4 right-4 inline-flex size-10 items-center justify-center rounded-full bg-neutral-950/80 text-white transition-colors hover:bg-neutral-950"
      >
        <X className="size-5" />
      </button>
    </div>
  </div>
)
