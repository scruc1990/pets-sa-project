import { useState, useEffect } from 'react'
import { useAuditoriaMedicamentosClientes } from '../hooks/useAuditoriaMedicamentosClientes'

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

  const [activeTab, setActiveTab] = useState<'detalles' | 'clientes' | 'medicamentos'>(
    'detalles'
  )
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  useEffect(() => {
    if (!toastMessage) return

    const timer = setTimeout(() => {
      setToastMessage(null)
    }, 2200)

    return () => clearTimeout(timer)
  }, [toastMessage])

  const handleRefresh = () => {
    refetch()
    setToastMessage('Reporte actualizado')
  }

  return (
    <main className="animate-in space-y-8 p-8 fade-in duration-500">
      {toastMessage && (
        <div className="fixed right-4 top-4 z-50 rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow-lg">
          {toastMessage}
        </div>
      )}

      <div className="space-y-6">
        {/* Header */}
        <header className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-slate-700 bg-slate-800 p-6">
          <div>
            <h1 className="text-3xl font-black text-white">Reporte Consolidado</h1>
            <p className="mt-1 text-slate-400">
              Seguimiento detallado de aplicaciones clínicas.
            </p>
          </div>
          <div className="flex items-center gap-2">

            <button
              onClick={handleRefresh}
              disabled={isFetching}
              className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-purple-600 to-purple-700 px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-purple-500/25 transition-all hover:from-purple-700 hover:to-purple-800 disabled:opacity-50"
            >
              <span>{isFetching ? 'Actualizando...' : 'Actualizar Reporte'}</span>
            </button>
          </div>
        </header>

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center rounded-lg border border-slate-700 bg-slate-800 p-12">
            <div className="flex flex-col items-center gap-2">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-600 border-t-purple-500" />
              <p className="text-sm text-slate-400">Cargando reporte...</p>
            </div>
          </div>
        )}

        {/* Error State */}
        {isError && (
          <div className="rounded-lg border border-red-900/50 bg-red-900/20 p-4">
            <h3 className="text-sm font-semibold text-red-400">Error al cargar el reporte</h3>
            <p className="text-sm text-red-300">
              {error instanceof Error ? error.message : 'Ocurrió un error desconocido'}
            </p>
          </div>
        )}

        {/* Data */}
        {data && !isLoading && (
          <div className="space-y-6">
            {/* Summary Cards */}
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

            {/* Tabs */}
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

              {/* Tab Content */}
              <div className="overflow-hidden rounded-lg border border-slate-700 bg-slate-800">
                {activeTab === 'detalles' && (
                  <div className="space-y-4 p-4">
                    {data.detalles.length > 0 ? (
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm text-white">
                          <thead className="border-b border-slate-700 bg-slate-900/50">
                            <tr>
                              {detalleColumns.map((column) => (
                                <th
                                  key={String(column.key)}
                                  className="px-4 py-2 text-left font-semibold text-slate-300"
                                >
                                  {column.header}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-700">
                            {data.detalles.map((row) => (
                              <tr key={row.mascotaId} className="transition-colors hover:bg-slate-700/30">
                                <td className="px-4 py-2 text-slate-300">{row.mascotaNombre}</td>
                                <td className="px-4 py-2 text-slate-300">{row.raza}</td>
                                <td className="px-4 py-2 text-slate-300">{row.clienteNombreCompleto}</td>
                                <td className="px-4 py-2 text-slate-300">{row.medicamentoNombre}</td>
                                <td className="px-4 py-2 text-slate-300">
                                  {row.medicamentoDosis ?? 'N/A'}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <p className="text-center text-sm text-slate-400">
                        No hay detalles disponibles
                      </p>
                    )}
                  </div>
                )}

                {activeTab === 'clientes' && (
                  <div className="space-y-4 p-4">
                    {resumenClienteRows.length > 0 ? (
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm text-white">
                          <thead className="border-b border-slate-700 bg-slate-900/50">
                            <tr>
                              <th className="px-4 py-2 text-left font-semibold text-slate-300">
                                Cédula
                              </th>
                              <th className="px-4 py-2 text-left font-semibold text-slate-300">
                                Nombre
                              </th>
                              <th className="px-4 py-2 text-left font-semibold text-slate-300">
                                Total Mascotas
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-700">
                            {resumenClienteRows.map((row) => (
                              <tr
                                key={row.cedula}
                                className="transition-colors hover:bg-slate-700/30"
                              >
                                <td className="px-4 py-2 text-slate-300">{row.cedula}</td>
                                <td className="px-4 py-2 text-slate-300">{row.nombre}</td>
                                <td className="px-4 py-2 text-slate-300">{row.totalMascotas}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <p className="text-center text-sm text-slate-400">
                        No hay datos disponibles
                      </p>
                    )}
                  </div>
                )}

                {activeTab === 'medicamentos' && (
                  <div className="space-y-4 p-4">
                    {resumenMedicamentoRows.length > 0 ? (
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm text-white">
                          <thead className="border-b border-slate-700 bg-slate-900/50">
                            <tr>
                              <th className="px-4 py-2 text-left font-semibold text-slate-300">
                                ID
                              </th>
                              <th className="px-4 py-2 text-left font-semibold text-slate-300">
                                Medicamento
                              </th>
                              <th className="px-4 py-2 text-left font-semibold text-slate-300">
                                Total Mascotas
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-700">
                            {resumenMedicamentoRows.map((row) => (
                              <tr
                                key={row.medicamentoId}
                                className="transition-colors hover:bg-slate-700/30"
                              >
                                <td className="px-4 py-2 text-slate-300">{row.medicamentoId}</td>
                                <td className="px-4 py-2 text-slate-300">
                                  {row.medicamentoNombre}
                                </td>
                                <td className="px-4 py-2 text-slate-300">{row.totalMascotas}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <p className="text-center text-sm text-slate-400">
                        No hay datos disponibles
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
