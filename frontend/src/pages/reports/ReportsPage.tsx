import { useEffect, useMemo, useState } from 'react'
import { DataTable } from '../../components/common/DataTable'
import { Button } from '../../components/ui/Button'
import { useAuditoriaMedicamentosClientes } from '../../hooks/useAuditoriaMedicamentosClientes'
import type { AuditoriaDetalle } from '../../types/reportes'

type ActiveTab = 'detalles' | 'clientes' | 'medicamentos'

export function ReportsPage() {
  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
    detalleColumns,
    resumenClienteRows,
    resumenMedicamentoRows,
  } = useAuditoriaMedicamentosClientes()

  const [activeTab, setActiveTab] = useState<ActiveTab>('detalles')
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  useEffect(() => {
    if (!toastMessage) return
    const timer = setTimeout(() => setToastMessage(null), 2200)
    return () => clearTimeout(timer)
  }, [toastMessage])

  const handleRefresh = () => {
    refetch()
    setToastMessage('Reporte actualizado')
  }

  const detailTableColumns = useMemo(
    () =>
      detalleColumns.map((column) => ({
        ...column,
        render:
          column.key === 'medicamentoDosis'
            ? (row: AuditoriaDetalle) => row.medicamentoDosis ?? 'N/A'
            : undefined,
      })),
    [detalleColumns],
  )

  return (
    <main className="animate-in space-y-8 p-8 fade-in duration-500">
      {toastMessage ? (
        <div className="fixed right-4 top-4 z-50 rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow-lg">
          {toastMessage}
        </div>
      ) : null}

      <div className="space-y-6">
        <header className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-slate-700 bg-slate-800 p-6">
          <div>
            <h1 className="text-3xl font-black text-white">Reporte Consolidado</h1>
            <p className="mt-1 text-slate-400">Seguimiento detallado de aplicaciones clínicas.</p>
          </div>
          <Button onClick={handleRefresh} disabled={isFetching}>
            {isFetching ? 'Actualizando...' : 'Actualizar Reporte'}
          </Button>
        </header>

        {isLoading ? (
          <div className="flex justify-center rounded-lg border border-slate-700 bg-slate-800 p-12">
            <div className="flex flex-col items-center gap-2">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-600 border-t-purple-500" />
              <p className="text-sm text-slate-400">Cargando reporte...</p>
            </div>
          </div>
        ) : null}

        {isError ? (
          <div className="rounded-lg border border-red-900/50 bg-red-900/20 p-4">
            <h3 className="text-sm font-semibold text-red-400">Error al cargar el reporte</h3>
            <p className="text-sm text-red-300">
              {error instanceof Error ? error.message : 'Ocurrió un error desconocido'}
            </p>
          </div>
        ) : null}

        {data && !isLoading ? (
          <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-lg border border-slate-700 bg-slate-800 p-6">
                <p className="text-xs font-medium uppercase text-slate-400">Total de Registros</p>
                <p className="mt-1 text-2xl font-bold text-white">{data.totalRegistros}</p>
              </div>
              <div className="rounded-lg border border-slate-700 bg-slate-800 p-6">
                <p className="text-xs font-medium uppercase text-slate-400">Fecha Generado</p>
                <p className="mt-1 text-sm font-medium text-slate-200">
                  {new Date(data.generadoEn).toLocaleString('es-ES')}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex gap-2 border-b border-slate-700">
                {(['detalles', 'clientes', 'medicamentos'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 text-sm font-medium transition-all ${
                      activeTab === tab
                        ? 'border-b-2 border-purple-600 text-purple-400'
                        : 'text-slate-400 hover:text-slate-300'
                    }`}
                  >
                    {tab === 'detalles' && 'Detalles'}
                    {tab === 'clientes' && 'Resumen Clientes'}
                    {tab === 'medicamentos' && 'Resumen Medicamentos'}
                  </button>
                ))}
              </div>

              <div className="overflow-hidden rounded-lg border border-slate-700 bg-slate-800 p-4">
                {activeTab === 'detalles' ? (
                  <DataTable
                    columns={detailTableColumns}
                    data={data.detalles}
                    emptyMessage="No hay detalles disponibles"
                    rowKey={(row, index) => `${row.mascotaId}-${index}`}
                  />
                ) : null}

                {activeTab === 'clientes' ? (
                  <DataTable
                    columns={[
                      { key: 'cedula', header: 'Cédula' },
                      { key: 'nombre', header: 'Nombre' },
                      { key: 'totalMascotas', header: 'Total Mascotas' },
                    ]}
                    data={resumenClienteRows}
                    emptyMessage="No hay datos disponibles"
                    rowKey={(row) => row.cedula}
                  />
                ) : null}

                {activeTab === 'medicamentos' ? (
                  <DataTable
                    columns={[
                      { key: 'medicamentoId', header: 'ID' },
                      { key: 'medicamentoNombre', header: 'Medicamento' },
                      { key: 'totalMascotas', header: 'Total Mascotas' },
                    ]}
                    data={resumenMedicamentoRows}
                    emptyMessage="No hay datos disponibles"
                    rowKey={(row) => String(row.medicamentoId)}
                  />
                ) : null}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </main>
  )
}
