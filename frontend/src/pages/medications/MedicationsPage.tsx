import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { domainAPI } from '../../api/domain'
import { DataTable } from '../../components/common/DataTable'
import { Button } from '../../components/ui/Button'
import type { Medicamento } from '../../types/domain'

export function MedicationsPage() {
  const navigate = useNavigate()
  const [medications, setMedications] = useState<Medicamento[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    void loadMedications()
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
        await loadMedications()
      } catch (error) {
        console.error('Error deleting medication:', error)
      }
    }
  }

  const columns = useMemo(
    () => [
      {
        key: 'id',
        header: 'ID',
        render: (med: Medicamento) => `${String(med.id).slice(0, 8)}...`,
      },
      { key: 'nombre', header: 'Nombre' },
      { key: 'descripcion', header: 'Descripción' },
      {
        key: 'dosis',
        header: 'Dosis',
        render: (med: Medicamento) => (
          <span className="inline-flex items-center rounded-full border border-purple-600/30 bg-purple-600/10 px-2.5 py-0.5 text-xs font-medium text-purple-400">
            {med.dosis}
          </span>
        ),
      },
      {
        key: 'actions',
        header: 'Acciones',
        className: 'text-right',
        render: (med: Medicamento) => (
          <div className="space-x-2 text-right">
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
          </div>
        ),
      },
    ],
    [],
  )

  return (
    <div className="animate-in space-y-8 p-8 slide-in-from-right-2 duration-500">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h3 className="text-3xl font-black tracking-tight text-white">Inventario Farmacéutico</h3>
          <p className="mt-2 text-slate-400">
            Mantenimiento de registros de medicamentos clínicos y protocolos.
          </p>
        </div>
        <Button onClick={() => navigate('/medications/new')} leftIcon="➕">
          Nuevo Medicamento
        </Button>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-700 bg-slate-800 p-4 shadow-sm">
        {loading ? (
          <p className="py-8 text-center text-slate-400">Cargando...</p>
        ) : (
          <DataTable
            columns={columns}
            data={medications}
            emptyMessage="No hay medicamentos registrados"
            rowKey={(row) => String(row.id)}
          />
        )}
      </div>
    </div>
  )
}
