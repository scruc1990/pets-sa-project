import type { ReactNode } from 'react'
import { useLocation, Link } from 'react-router-dom'

interface LayoutProps {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  const location = useLocation()
  
  const isActive = (path: string) => location.pathname === path

  return (
    <div className="flex h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Sidebar */}
      <aside className="hidden w-64 flex-shrink-0 border-r border-slate-700 bg-slate-900 md:flex md:flex-col">
        <div className="p-6">
          <div className="mb-8 flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-lg shadow-purple-500/20">
              <span className="text-lg">🐾</span>
            </div>
            <div>
              <h1 className="text-sm font-bold leading-tight uppercase tracking-wider text-white">
                PETS S.A.
              </h1>
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                Admin Panel
              </p>
            </div>
          </div>
          <nav className="space-y-1">
            <Link
              to="/"
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold transition-all ${
                isActive('/')
                  ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-md shadow-purple-500/20'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-purple-400'
              }`}
            >
              <span>📊</span>
              Dashboard
            </Link>
            <Link
              to="/clients"
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold transition-all ${
                isActive('/clients')
                  ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-md shadow-purple-500/20'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-purple-400'
              }`}
            >
              <span>👥</span>
              Clientes
            </Link>
            <Link
              to="/pets"
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold transition-all ${
                isActive('/pets') || isActive('/pets/new')
                  ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-md shadow-purple-500/20'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-purple-400'
              }`}
            >
              <span>🐕</span>
              Mascotas
            </Link>
            <Link
              to="/medications"
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold transition-all ${
                isActive('/medications') || isActive('/medications/new')
                  ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-md shadow-purple-500/20'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-purple-400'
              }`}
            >
              <span>💊</span>
              Medicamentos
            </Link>
            <Link
              to="/reports"
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold transition-all ${
                isActive('/reports')
                  ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-md shadow-purple-500/20'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-purple-400'
              }`}
            >
              <span>📈</span>
              Reportes
            </Link>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex flex-1 flex-col overflow-hidden">

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto">{children}</div>
      </main>
    </div>
  )
}
