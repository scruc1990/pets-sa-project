import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { domainAPI } from '../../api/domain'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { Select } from '../../components/ui/Select'
import type { Cliente, Medicamento } from '../../types/domain'

type PetFormData = {
  nombre: string
  raza: string
  edad: string
  peso: string
  clienteId: string
  medicamentoId: string
}

const initialForm: PetFormData = {
  nombre: '',
  raza: '',
  edad: '',
  peso: '',
  clienteId: '',
  medicamentoId: '',
}

export function NewPetPage() {
  const navigate = useNavigate()
  const { id } = useParams()
  const isEditMode = Boolean(id)
  const [clients, setClients] = useState<Cliente[]>([])
  const [medications, setMedications] = useState<Medicamento[]>([])
  const [pageLoading, setPageLoading] = useState(isEditMode)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState<PetFormData>(initialForm)

  useEffect(() => {
    void initializeForm()
  }, [id])

  const initializeForm = async () => {
    try {
      setPageLoading(true)
      const [clientData, medicationData] = await Promise.all([
        domainAPI.getClientes(),
        domainAPI.getMedicamentos(),
      ])
      setClients(clientData)
      setMedications(medicationData)

      if (!id) return

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

  const clientOptions = useMemo(
    () =>
      clients.map((client) => ({
        value: client.cedula,
        label: `${client.nombres} ${client.apellidos} (Cédula: ${client.cedula})`,
      })),
    [clients],
  )

  const medicationOptions = useMemo(
    () =>
      medications.map((medication) => ({
        value: medication.id,
        label: `${medication.nombre} - ${medication.descripcion}`,
      })),
    [medications],
  )

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
          <Button variant="ghost" onClick={() => navigate('/pets')}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? 'Guardando...' : isEditMode ? 'Actualizar Mascota' : 'Guardar Mascota'}
          </Button>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <div className="overflow-hidden rounded-xl border border-slate-700 bg-slate-800 p-8 shadow-sm">
            <h3 className="mb-6 text-lg font-bold text-white">Datos Principales</h3>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <Input
                label="Nombre"
                placeholder="Nombre de la mascota"
                value={formData.nombre}
                onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
              />
              <Input
                label="Raza"
                placeholder="Golden Retriever"
                value={formData.raza}
                onChange={(e) => setFormData({ ...formData, raza: e.target.value })}
              />
              <Input
                label="Edad (Años)"
                type="number"
                placeholder="3"
                value={formData.edad}
                onChange={(e) => setFormData({ ...formData, edad: e.target.value })}
              />
              <Input
                label="Peso (kg)"
                type="number"
                step="0.1"
                placeholder="12.5"
                value={formData.peso}
                onChange={(e) => setFormData({ ...formData, peso: e.target.value })}
              />
            </div>
          </div>

          <div className="overflow-hidden rounded-xl border border-slate-700 bg-slate-800 p-8 shadow-sm">
            <h3 className="mb-6 text-lg font-bold text-white">Vínculos</h3>
            <div className="space-y-4">
              <Select
                label="Asociar a Cliente"
                options={clientOptions}
                placeholder="Seleccionar cliente..."
                value={formData.clienteId}
                onChange={(e) => setFormData({ ...formData, clienteId: e.target.value })}
              />
              <Select
                label="Medicamento"
                options={medicationOptions}
                placeholder="Seleccionar medicamento..."
                value={formData.medicamentoId}
                onChange={(e) => setFormData({ ...formData, medicamentoId: e.target.value })}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
