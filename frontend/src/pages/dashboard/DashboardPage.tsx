import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { domainAPI } from '../../api/domain'
import { reportesAPI } from '../../api/reportes'
import { DataTable } from '../../components/common/DataTable'
import type { AuditoriaDetalle } from '../../types/reportes'

type StatCard = {
  label: string
  value: string
  icon: string
}

export function DashboardPage() {
  const [stats, setStats] = useState<StatCard[]>([
    { label: 'Total Mascotas', value: '0', icon: '🐕' },
    { label: 'Clientes Activos', value: '0', icon: '👥' },
    { label: 'Stock Medicamentos', value: '0', icon: '💊' },
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
          { label: 'Total Mascotas', value: String(data.totalRegistros), icon: '🐕' },
          { label: 'Clientes Activos', value: String(clientes.length), icon: '👥' },
          { label: 'Stock Medicamentos', value: String(medicamentos.length), icon: '💊' },
        ])

        setRecentRecords(data.detalles.slice(0, 5))
      } catch (error) {
        console.error('Error loading dashboard data:', error)
      } finally {
        setLoading(false)
      }
    }

    void loadData()
  }, [])

  const recentColumns = useMemo(
    () => [
      { key: 'mascotaNombre', header: 'Mascota' },
      { key: 'clienteNombreCompleto', header: 'Propietario' },
      {
        key: 'fecha',
        header: 'Fecha',
        render: () => new Date().toLocaleDateString('es-CO'),
      },
      {
        key: 'medicamentoNombre',
        header: 'Medicamento',
        render: (row: AuditoriaDetalle) => (
          <span className="rounded border border-purple-600/30 bg-purple-600/10 px-2 py-1 text-xs font-medium text-purple-400">
            {row.medicamentoNombre || 'N/A'}
          </span>
        ),
      }
    ],
    [],
  )

  return (
    <div className="animate-in space-y-8 p-8 fade-in duration-500">
      <div className="flex flex-col gap-1">
        <h3 className="text-3xl font-black tracking-tight text-white">
          Bienvenido de nuevo, PETS S.A.
        </h3>
        <p className="font-medium text-slate-400">Resumen del estado de la clínica para hoy.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-slate-700 bg-slate-800 p-6 shadow-sm transition-all hover:border-slate-600 hover:shadow-md"
          >
            <div className="mb-4 flex size-12 items-center justify-center rounded-lg bg-slate-700 text-2xl">
              {stat.icon}
            </div>
            <p className="text-sm font-semibold uppercase tracking-wider text-slate-400">{stat.label}</p>
            <p className="mt-1 text-4xl font-black text-white">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-700 bg-slate-800 shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-700 px-6 py-4">
          <h2 className="text-lg font-bold text-white">Registros Recientes</h2>
          <Link to="/reports" className="text-sm font-bold text-purple-400 hover:underline">
            Ver todo
          </Link>
        </div>
        <div className="p-4">
          {loading ? (
            <p className="py-8 text-center text-slate-400">Cargando...</p>
          ) : (
            <DataTable
              columns={recentColumns}
              data={recentRecords}
              emptyMessage="Sin registros disponibles"
              rowKey={(row, index) => `${row.mascotaId}-${index}`}
            />
          )}
        </div>
      </div>
    </div>
  )
}
