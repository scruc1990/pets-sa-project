import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { domainAPI } from '../api/domain'
import type { Medicamento } from '../types/domain'

export function MedicationsPage() {
  const navigate = useNavigate()
  const [medications, setMedications] = useState<Medicamento[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadMedications()
  }, [])

  const loadMedications = async () => {
    try {
      setLoading(true)
      const data = await domainAPI.getMedicamentos()
      setMedications(data)
    } catch (error) {
      console.error('Error loading medications:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteMed = async (id: number) => {
    if (confirm('¿Está seguro de que desea eliminar este medicamento?')) {
      try {
        await domainAPI.deleteMedicamento(id)
        loadMedications()
      } catch (error) {
        console.error('Error deleting medication:', error)
      }
    }
  }

  return (
    <div className="animate-in space-y-8 p-8 slide-in-from-right-2 duration-500">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h3 className="text-3xl font-black tracking-tight text-white">
            Inventario Farmacéutico
          </h3>
          <p className="mt-2 text-slate-400">
            Mantenimiento de registros de medicamentos clínicos y protocolos.
          </p>
        </div>
        <button
          onClick={() => navigate('/medications/new')}
          className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-purple-600 to-purple-700 px-6 py-2.5 font-bold text-white shadow-lg shadow-purple-500/20 transition-all hover:from-purple-700 hover:to-purple-800"
        >
          <span>➕</span>
          Nuevo Medicamento
        </button>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-slate-700 bg-slate-800 shadow-sm">
        <table className="w-full text-left text-white">
          <thead className="border-b border-slate-700 bg-slate-900/50">
            <tr>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-400">
                ID
              </th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-400">
                Nombre
              </th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-400">
                Descripción
              </th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-400">
                Dosis
              </th>
              <th className="px-6 py-4 text-right text-xs font-bold uppercase tracking-widest text-slate-400">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700">
            {loading ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-slate-400">
                  Cargando...
                </td>
              </tr>
            ) : medications.length > 0 ? (
              medications.map((med) => (
                <tr key={med.id} className="transition-colors hover:bg-slate-700/30">
                  <td className="px-6 py-5 text-sm font-medium text-slate-400">
                    {String(med.id).slice(0, 8)}...
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-semibold">{med.nombre}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <p className="max-w-xs truncate text-sm text-slate-400">
                      {med.descripcion}
                    </p>
                  </td>
                  <td className="px-6 py-5">
                    <span className="inline-flex items-center rounded-full bg-purple-600/10 px-2.5 py-0.5 text-xs font-medium text-purple-400 border border-purple-600/30">
                      {med.dosis}
                    </span>
                  </td>
                  <td className="space-x-2 px-6 py-5 text-right">
                    <button
                      onClick={() => navigate(`/medications/${med.id}/edit`)}
                      className="transition-colors hover:text-purple-400"
                    >
                      ✎
                    </button>
                    <button
                      onClick={() => handleDeleteMed(med.id)}
                      className="transition-colors hover:text-red-400"
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-slate-400">
                  No hay medicamentos registrados
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
