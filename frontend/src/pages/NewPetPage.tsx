import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { domainAPI } from '../api/domain'
import type { Cliente, Medicamento } from '../types/domain'

export function NewPetPage() {
  const navigate = useNavigate()
  const { id } = useParams()
  const isEditMode = Boolean(id)
  const [clients, setClients] = useState<Cliente[]>([])
  const [medications, setMedications] = useState<Medicamento[]>([])
  const [pageLoading, setPageLoading] = useState(isEditMode)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    nombre: '',
    raza: '',
    edad: '',
    peso: '',
    clienteId: '',
    medicamentoId: '',
  })

  useEffect(() => {
    void initializeForm()
  }, [id])

  const initializeForm = async () => {
    try {
      setPageLoading(true)
      await Promise.all([loadClients(), loadMedications()])

      if (!id) {
        return
      }

      const pet = await domainAPI.getMascotaById(id)
      setFormData({
        nombre: pet.nombre,
        raza: pet.raza,
        edad: String(pet.edad),
        peso: String(pet.peso),
        clienteId: pet.clienteId,
        medicamentoId: String(pet.medicamentoId),
      })
    } catch (error) {
      console.error('Error initializing pet form:', error)
    } finally {
      setPageLoading(false)
    }
  }

  const loadClients = async () => {
    try {
      const data = await domainAPI.getClientes()
      setClients(data)
    } catch (error) {
      console.error('Error loading clients:', error)
    }
  }

  const loadMedications = async () => {
    try {
      const data = await domainAPI.getMedicamentos()
      setMedications(data)
    } catch (error) {
      console.error('Error loading medications:', error)
    }
  }

  const handleSubmit = async () => {
    try {
      setLoading(true)
      const payload = {
        nombre: formData.nombre,
        raza: formData.raza,
        edad: parseInt(formData.edad),
        peso: parseFloat(formData.peso),
        clienteId: formData.clienteId,
        medicamentoId: parseInt(formData.medicamentoId),
      }

      if (id) {
        await domainAPI.updateMascota(id, payload)
      } else {
        await domainAPI.createMascota(payload)
      }

      navigate('/pets')
    } catch (error) {
      console.error('Error saving pet:', error)
    } finally {
      setLoading(false)
    }
  }

  if (pageLoading) {
    return (
      <div className="animate-in p-8 text-slate-300 slide-in-from-right-2 duration-500 lg:p-12">
        Cargando formulario...
      </div>
    )
  }

  return (
    <div className="animate-in space-y-8 p-8 slide-in-from-right-2 duration-500 lg:p-12">
      <header className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-black tracking-tight text-white">
            {isEditMode ? 'Editar Mascota' : 'Registro de Mascotas'}
          </h2>
          <p className="mt-2 text-slate-400">
            {isEditMode
              ? 'Actualice la información de la mascota seleccionada.'
              : 'Complete la información detallada para dar de alta una nueva mascota.'}
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => navigate('/pets')}
            className="rounded-lg border border-slate-600 px-5 py-2.5 text-sm font-semibold text-slate-300 transition-colors hover:bg-slate-700"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="rounded-lg bg-gradient-to-r from-purple-600 to-purple-700 px-5 py-2.5 text-sm font-semibold text-white shadow-xl shadow-purple-500/20 transition-all hover:from-purple-700 hover:to-purple-800 disabled:opacity-50"
          >
            {loading ? 'Guardando...' : isEditMode ? 'Actualizar Mascota' : 'Guardar Mascota'}
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Form Section */}
        <div className="space-y-6 lg:col-span-2">
          <div className="overflow-hidden rounded-xl border border-slate-700 bg-slate-800 p-8 shadow-sm">
            <h3 className="mb-6 flex items-center gap-2 text-lg font-bold text-white">
              ℹ️ Datos Principales
            </h3>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-white">Nombre</label>
                <input
                  className="w-full rounded-lg border border-slate-600 bg-slate-700 px-4 py-3 text-white placeholder-slate-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
                  placeholder="Nombre de la mascota"
                  value={formData.nombre}
                  onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-white">Raza</label>
                <input
                  className="w-full rounded-lg border border-slate-600 bg-slate-700 px-4 py-3 text-white placeholder-slate-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
                  placeholder="Golden Retriever"
                  value={formData.raza}
                  onChange={(e) => setFormData({ ...formData, raza: e.target.value })}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-white">Edad (Años)</label>
                <input
                  type="number"
                  className="w-full rounded-lg border border-slate-600 bg-slate-700 px-4 py-3 text-white placeholder-slate-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
                  placeholder="3"
                  value={formData.edad}
                  onChange={(e) => setFormData({ ...formData, edad: e.target.value })}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-white">Peso (kg)</label>
                <input
                  type="number"
                  step="0.1"
                  className="w-full rounded-lg border border-slate-600 bg-slate-700 px-4 py-3 text-white placeholder-slate-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
                  placeholder="12.5"
                  value={formData.peso}
                  onChange={(e) => setFormData({ ...formData, peso: e.target.value })}
                />
              </div>
            </div>
          </div>

          {/* Links Section */}
          <div className="overflow-hidden rounded-xl border border-slate-700 bg-slate-800 p-8 shadow-sm">
            <h3 className="mb-6 flex items-center gap-2 text-lg font-bold text-white">
              📋 Vínculos
            </h3>
            <div className="space-y-4">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-white">Asociar a Cliente</label>
                <select
                  className="w-full rounded-lg border border-slate-600 bg-slate-700 px-4 py-3 text-white placeholder-slate-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
                  value={formData.clienteId}
                  onChange={(e) => setFormData({ ...formData, clienteId: e.target.value })}
                >
                  <option value="">Seleccionar cliente...</option>
                  {clients.map((client) => (
                    <option key={client.cedula} value={client.cedula}>
                      {client.nombres} {client.apellidos} (Cédula: {client.cedula})
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-white">Medicamento</label>
                <select
                  className="w-full rounded-lg border border-slate-600 bg-slate-700 px-4 py-3 text-white placeholder-slate-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
                  value={formData.medicamentoId}
                  onChange={(e) => setFormData({ ...formData, medicamentoId: e.target.value })}
                >
                  <option value="">Seleccionar medicamento...</option>
                  {medications.map((medication) => (
                    <option key={medication.id} value={medication.id}>
                      {medication.nombre} - {medication.descripcion}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>


      </div>
    </div>
  )
}
