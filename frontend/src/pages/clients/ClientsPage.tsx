import { useMemo, useState, useEffect } from 'react'
import { domainAPI } from '../../api/domain'
import { DataTable } from '../../components/common/DataTable'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import type { Cliente } from '../../types/domain'

type ClientFormData = {
  cedula: string
  nombres: string
  apellidos: string
  telefono: string
  direccion: string
}

const initialFormData: ClientFormData = {
  cedula: '',
  nombres: '',
  apellidos: '',
  telefono: '',
  direccion: '',
}

export function ClientsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [clients, setClients] = useState<Cliente[]>([])
  const [loading, setLoading] = useState(true)
  const [editingCedula, setEditingCedula] = useState<string | null>(null)
  const [formData, setFormData] = useState<ClientFormData>(initialFormData)

  useEffect(() => {
    void loadClients()
  }, [])

  const loadClients = async () => {
    try {
      setLoading(true)
      const data = await domainAPI.getClientes()
      setClients(data)
    } catch (error) {
      console.error('Error loading clients:', error)
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setFormData(initialFormData)
    setEditingCedula(null)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    resetForm()
  }

  const handleOpenCreateModal = () => {
    resetForm()
    setIsModalOpen(true)
  }

  const handleOpenEditModal = (client: Cliente) => {
    setEditingCedula(client.cedula)
    setFormData({
      cedula: client.cedula,
      nombres: client.nombres,
      apellidos: client.apellidos,
      telefono: client.telefono,
      direccion: client.direccion,
    })
    setIsModalOpen(true)
  }

  const handleSaveClient = async () => {
    try {
      if (editingCedula) {
        await domainAPI.updateCliente(editingCedula, {
          nombres: formData.nombres,
          apellidos: formData.apellidos,
          telefono: formData.telefono,
          direccion: formData.direccion,
        })
      } else {
        await domainAPI.createCliente(formData)
      }
      closeModal()
      await loadClients()
    } catch (error) {
      console.error('Error saving client:', error)
    }
  }

  const handleDeleteClient = async (cedula: string) => {
    if (confirm('¿Está seguro de que desea eliminar este cliente?')) {
      try {
        await domainAPI.deleteCliente(cedula)
        await loadClients()
      } catch (error) {
        console.error('Error deleting client:', error)
      }
    }
  }

  const columns = useMemo(
    () => [
      { key: 'cedula', header: 'Cédula' },
      {
        key: 'nombre',
        header: 'Nombre Completo',
        render: (client: Cliente) => `${client.nombres} ${client.apellidos}`,
      },
      { key: 'telefono', header: 'Teléfono' },
      { key: 'direccion', header: 'Dirección' },
      {
        key: 'actions',
        header: 'Acciones',
        className: 'text-right',
        render: (client: Cliente) => (
          <div className="space-x-2 text-right">
            <button
              onClick={() => handleOpenEditModal(client)}
              className="transition-colors hover:text-purple-400"
            >
              ✎
            </button>
            <button
              onClick={() => handleDeleteClient(client.cedula)}
              className="transition-colors hover:text-red-400"
            >
              🗑️
            </button>
          </div>
        ),
      },
    ],
    [clients],
  )

  return (
    <div className="animate-in space-y-8 p-8 slide-in-from-bottom-2 duration-500">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h2 className="text-3xl font-black tracking-tight text-white">Gestión de Clientes</h2>
          <p className="mt-1 text-slate-400">Administración de propietarios de mascotas.</p>
        </div>
        <Button onClick={handleOpenCreateModal} leftIcon="➕">
          Nuevo Cliente
        </Button>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-700 bg-slate-800 shadow-sm p-4">
        {loading ? (
          <p className="py-8 text-center text-slate-400">Cargando...</p>
        ) : (
          <DataTable
            columns={columns}
            data={clients}
            emptyMessage="No hay clientes registrados"
            rowKey={(row) => row.cedula}
          />
        )}
      </div>

      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm"
          onClick={closeModal}
        >
          <div
            className="w-full max-w-xl animate-in rounded-xl border border-slate-700 bg-slate-800 shadow-2xl zoom-in duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-700 p-6">
              <h3 className="text-xl font-bold text-white">
                {editingCedula ? 'Editar Cliente' : 'Nuevo Cliente'}
              </h3>
              <button onClick={closeModal} className="text-slate-400 transition-colors hover:text-slate-200">
                ✕
              </button>
            </div>
            <div className="space-y-6 p-6">
              <Input
                label="Cédula"
                placeholder="1-1111-1111"
                value={formData.cedula}
                disabled={Boolean(editingCedula)}
                onChange={(e) => setFormData({ ...formData, cedula: e.target.value })}
              />
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <Input
                  label="Nombres"
                  placeholder="Juan"
                  value={formData.nombres}
                  onChange={(e) => setFormData({ ...formData, nombres: e.target.value })}
                />
                <Input
                  label="Apellidos"
                  placeholder="Pérez"
                  value={formData.apellidos}
                  onChange={(e) => setFormData({ ...formData, apellidos: e.target.value })}
                />
              </div>
              <Input
                label="Teléfono"
                placeholder="+57 300 000 0000"
                value={formData.telefono}
                onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
              />
              <Input
                label="Dirección"
                placeholder="Centro Histórico, Cartagena"
                value={formData.direccion}
                onChange={(e) => setFormData({ ...formData, direccion: e.target.value })}
              />
            </div>
            <div className="flex justify-end gap-3 border-t border-slate-700 bg-slate-900/50 p-6">
              <Button variant="ghost" onClick={closeModal}>
                Cancelar
              </Button>
              <Button onClick={handleSaveClient}>
                {editingCedula ? 'Actualizar Cliente' : 'Guardar Cliente'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
