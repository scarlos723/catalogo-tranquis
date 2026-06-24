import { useState } from "react"
import { Link, NavLink, Outlet } from "react-router-dom"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card"

const SANTOYSENA = "solotranquis"

export function ProtectedLayout() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [passwordInput, setPasswordInput] = useState("")
  const [error, setError] = useState(false)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (passwordInput === SANTOYSENA) {
      setIsAuthenticated(true)
      setError(false)
    } else {
      setError(true)
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-neutral-950">
        <Card className="w-full max-w-md border-neutral-800 bg-neutral-900">
          <CardHeader>
            <CardTitle className="text-white">Acceso Restringido</CardTitle>
            <CardDescription>
              Ingresa la contraseña para ver los detalles
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <input
                  type="password"
                  value={passwordInput}
                  onChange={(e) => {
                    setPasswordInput(e.target.value)
                    setError(false)
                  }}
                  placeholder="Contraseña"
                  className="w-full rounded-lg border border-neutral-700 bg-neutral-800 px-4 py-3 text-white placeholder-neutral-500 focus:border-blue-600 focus:outline-none"
                />
                {error && (
                  <p className="mt-2 text-sm text-red-400">
                    Contraseña incorrecta
                  </p>
                )}
              </div>
              <button
                type="submit"
                className="w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
              >
                Ingresar
              </button>
            </form>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-50">
      <nav className="sticky top-0 z-40 border-b border-neutral-800 bg-neutral-950/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          <Link
            to="/margen"
            className="text-lg font-bold tracking-tight text-white"
          >
            Catálogo Tranquis
          </Link>
          <div className="flex items-center gap-2">
            <NavLink
              to="/margen"
              className={({ isActive }) =>
                `rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-neutral-300 hover:bg-neutral-800 hover:text-white"
                }`
              }
            >
              Margen
            </NavLink>
            <NavLink
              to="/sales"
              className={({ isActive }) =>
                `rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-neutral-300 hover:bg-neutral-800 hover:text-white"
                }`
              }
            >
              Ventas
            </NavLink>
          </div>
        </div>
      </nav>
      <Outlet />
    </div>
  )
}
