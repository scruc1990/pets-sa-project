import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { domainAPI } from '../api/domain'

export function NewMedicationPage() {
  const navigate = useNavigate()
  const { id } = useParams()
  const isEditMode = Boolean(id)
  const [loading, setLoading] = useState(false)
  const [pageLoading, setPageLoading] = useState(isEditMode)
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    dosis: '',
  })

  useEffect(() => {
    if (isEditMode && id) {
      loadMedicamento()
    } else {
      setPageLoading(false)
    }
  }, [id])

  const loadMedicamento = async () => {
    try {
      setPageLoading(true)
      const med = await domainAPI.getMedicamentoById(Number(id))
      setFormData({
        nombre: med.nombre,
        descripcion: med.descripcion,
        dosis: med.dosis,
      })
    } catch (error) {
      console.error('Error loading medication:', error)
    } finally {
      setPageLoading(false)
    }
  }

  const handleSubmit = async () => {
    try {
      setLoading(true)
      if (id) {
        await domainAPI.updateMedicamento(Number(id), formData)
      } else {
        await domainAPI.createMedicamento(formData)
      }
      navigate('/medications')
    } catch (error) {
      console.error('Error saving medication:', error)
    } finally {
      setLoading(false)
    }
  }

  if (pageLoading) {
    return (
      <div className="animate-in p-8 text-slate-300 slide-in-from-right-2 duration-500 max-w-4xl">
        Cargando medicamento...
      </div>
    )
  }

  return (
    <div className="animate-in space-y-8 p-8 slide-in-from-right-2 duration-500 max-w-4xl">
      <header className="mb-8">
        <div className="mb-2 flex items-center gap-2 text-sm text-slate-400">
          <span>Medicamentos</span>
          <span>›</span>
          <span className="font-medium text-purple-400">
            {isEditMode ? 'Editar Medicamento' : 'Nuevo Registro'}
          </span>
        </div>
        <h2 className="text-3xl font-bold text-white">
          {isEditMode ? 'Editar Medicamento' : 'Registrar Nuevo Medicamento'}
        </h2>
        <p className="mt-1 text-slate-400">
          {isEditMode
            ? 'Actualice la información del medicamento seleccionado.'
            : 'Agregue un nuevo ítem a la farmacia clínica.'}
        </p>
      </header>

      <div className="overflow-hidden rounded-xl border border-slate-700 bg-slate-800 p-8 space-y-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-1">
            <label className="text-sm font-semibold text-white">Nombre</label>
            <input
              className="w-full rounded-lg border border-slate-600 bg-slate-700 px-4 py-3 text-white placeholder-slate-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
              placeholder="Ej: Amoxicilina"
              value={formData.nombre}
              onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-semibold text-white">Dosis</label>
            <input
              className="w-full rounded-lg border border-slate-600 bg-slate-700 px-4 py-3 text-white placeholder-slate-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
              placeholder="5mg/kg BID"
              value={formData.dosis}
              onChange={(e) => setFormData({ ...formData, dosis: e.target.value })}
            />
          </div>
        </div>
        <div className="space-y-1">
          <label className="text-sm font-semibold text-white">Descripción</label>
          <textarea
            className="w-full rounded-lg border border-slate-600 bg-slate-700 px-4 py-3 text-white placeholder-slate-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
            rows={4}
            placeholder="Instrucciones de uso e información adicional..."
            value={formData.descripcion}
            onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
          ></textarea>
        </div>

        <div className="flex justify-end gap-4 border-t border-slate-700 pt-6">
          <button
            onClick={() => navigate('/medications')}
            className="rounded-lg px-6 py-2.5 font-semibold text-sm text-slate-300 transition-colors hover:text-slate-100"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-purple-600 to-purple-700 px-8 py-2.5 font-semibold text-sm text-white shadow-md shadow-purple-500/20 transition-all hover:from-purple-700 hover:to-purple-800 disabled:opacity-50"
          >
            {loading ? 'Guardando...' : isEditMode ? 'Actualizar Medicamento' : 'Guardar'}
          </button>
        </div>
      </div>
    </div>
  )
}
