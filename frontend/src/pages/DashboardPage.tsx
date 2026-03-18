import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { domainAPI } from '../api/domain'
import { reportesAPI } from '../api/reportes'
import type { AuditoriaDetalle } from '../types/reportes'

interface StatCard {
  label: string
  value: string
  color: string
  icon: string
}

export function DashboardPage() {
  const [stats, setStats] = useState<StatCard[]>([
    { label: 'Total Mascotas', value: '0', color: 'purple', icon: '🐕' },
    { label: 'Clientes Activos', value: '0', color: 'blue', icon: '👥' },
    {
      label: 'Stock Medicamentos',
      value: '0',
      color: 'amber',
      icon: '💊',
    },
  ])
  const [recentRecords, setRecentRecords] = useState<AuditoriaDetalle[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true)
        const [data, clientes, medicamentos] = await Promise.all([
          reportesAPI.getAuditoriaMedicamentosClientes(),
          domainAPI.getClientes(),
          domainAPI.getMedicamentos(),
        ])

        setStats([
          {
            label: 'Total Mascotas',
            value: String(data.totalRegistros),
            color: 'purple',
            icon: '🐕',
          },
          {
            label: 'Clientes Activos',
            value: String(clientes.length),
            color: 'blue',
            icon: '👥',
          },
          {
            label: 'Stock Medicamentos',
            value: String(medicamentos.length),
            color: 'amber',
            icon: '💊',
          },
        ])

        if (data && data.detalles && data.detalles.length > 0) {
          setRecentRecords(data.detalles.slice(0, 2))
        } else {
          setRecentRecords([])
        }
      } catch (error) {
        console.error('Error loading dashboard data:', error)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  return (
    <div className="animate-in space-y-8 p-8 fade-in duration-500">
      <div className="flex flex-col gap-1">
        <h3 className="text-3xl font-black tracking-tight text-white">
          Bienvenido de nuevo, PETS S.A.
        </h3>
        <p className="font-medium text-slate-400">Resumen del estado de la clínica para hoy.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-slate-700 bg-slate-800 p-6 shadow-sm transition-all hover:border-slate-600 hover:shadow-md"
          >
            <div className="mb-4 flex items-start justify-between">
              <div className="flex size-12 items-center justify-center rounded-lg bg-slate-700 text-2xl">
                {stat.icon}
              </div>
            </div>
            <p className="text-sm font-semibold uppercase tracking-wider text-slate-400">
              {stat.label}
            </p>
            <p className="mt-1 text-4xl font-black text-white">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Recent Records */}
      <div className="overflow-hidden rounded-xl border border-slate-700 bg-slate-800 shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-700 px-6 py-4">
          <h2 className="text-lg font-bold text-white">Registros Recientes</h2>
          <Link to="/reports" className="text-sm font-bold text-purple-400 hover:underline">
            Ver todo
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-white">
            <thead>
              <tr className="border-b border-slate-700 bg-slate-900/50 text-[11px] font-bold uppercase tracking-widest text-slate-400">
                <th className="px-6 py-4">Mascota</th>
                <th className="px-6 py-4">Propietario</th>
                <th className="px-6 py-4">Fecha</th>
                <th className="px-6 py-4">Medicamento</th>
                <th className="px-6 py-4 text-right">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-slate-400">
                    Cargando...
                  </td>
                </tr>
              ) : recentRecords.length > 0 ? (
                recentRecords.map((record, idx) => (
                  <tr
                    key={idx}
                    className="transition-colors hover:bg-slate-700/30"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-semibold">
                          {record.mascotaNombre || 'N/A'}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-300">
                      {record.clienteNombreCompleto || 'N/A'}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-400">
                      {new Date().toLocaleDateString('es-CO')}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span className="rounded border border-purple-600/30 bg-purple-600/10 px-2 py-1 text-xs font-medium text-purple-400">
                        {record.medicamentoNombre || 'N/A'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="transition-colors hover:text-purple-400">⋮</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-slate-400">
                    Sin registros disponibles
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
