import { useState, useEffect } from 'react'
import { domainAPI } from '../api/domain'
import type { Cliente } from '../types/domain'

export function ClientsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [clients, setClients] = useState<Cliente[]>([])
  const [loading, setLoading] = useState(true)
  const [editingCedula, setEditingCedula] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    cedula: '',
    nombres: '',
    apellidos: '',
    telefono: '',
    direccion: '',
  })

  useEffect(() => {
    loadClients()
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
    setFormData({ cedula: '', nombres: '', apellidos: '', telefono: '', direccion: '' })
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
      loadClients()
    } catch (error) {
      console.error('Error saving client:', error)
    }
  }

  const handleDeleteClient = async (cedula: string) => {
    if (confirm('¿Está seguro de que desea eliminar este cliente?')) {
      try {
        await domainAPI.deleteCliente(cedula)
        loadClients()
      } catch (error) {
        console.error('Error deleting client:', error)
      }
    }
  }

  return (
    <div className="animate-in space-y-8 p-8 slide-in-from-bottom-2 duration-500">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
        <div>
          <h2 className="text-4xl font-black tracking-tight text-white">
            Gestión de Clientes
          </h2>
          <p className="mt-1 text-slate-400">Administración de propietarios de mascotas.</p>
        </div>
        <button
          onClick={handleOpenCreateModal}
          className="flex items-center justify-center rounded-lg bg-gradient-to-r from-purple-600 to-purple-700 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-purple-500/25 transition-all hover:from-purple-700 hover:to-purple-800"
        >
          <span className="mr-2">➕</span>
          Nuevo Cliente
        </button>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-slate-700 bg-slate-800 shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-white">
            <thead className="border-b border-slate-700 bg-slate-900/50">
              <tr>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-400">
                  Cédula
                </th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-400">
                  Nombre Completo
                </th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-400">
                  Teléfono
                </th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-400">
                  Dirección
                </th>
                <th className="px-6 py-4 text-right text-xs font-bold uppercase tracking-wider text-slate-400">
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
              ) : clients.length > 0 ? (
                clients.map((client) => (
                  <tr key={client.cedula} className="transition-colors hover:bg-slate-700/30">
                    <td className="px-6 py-4 text-sm font-medium text-slate-300">
                      {client.cedula}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex size-8 items-center justify-center rounded-full bg-purple-600/20 text-sm font-bold text-purple-400">
                          {client.nombres[0]}
                        </div>
                        <span className="text-sm font-semibold">
                          {client.nombres} {client.apellidos}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-300">{client.telefono}</td>
                    <td className="px-6 py-4 text-sm text-slate-300">{client.direccion}</td>
                    <td className="space-x-2 px-6 py-4 text-right">
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
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-slate-400">
                    No hay clientes registrados
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
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
              <button
                onClick={closeModal}
                className="text-slate-400 transition-colors hover:text-slate-200"
              >
                ✕
              </button>
            </div>
            <div className="space-y-6 p-6">
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase text-slate-400">Cédula</label>
                <input
                  className="w-full rounded-lg border border-slate-600 bg-slate-700 px-4 py-2 text-white placeholder-slate-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
                  type="text"
                  placeholder="1-1111-1111"
                  value={formData.cedula}
                  disabled={Boolean(editingCedula)}
                  onChange={(e) => setFormData({ ...formData, cedula: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase text-slate-400">Nombres</label>
                  <input
                    className="w-full rounded-lg border border-slate-600 bg-slate-700 px-4 py-2 text-white placeholder-slate-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
                    type="text"
                    placeholder="Juan"
                    value={formData.nombres}
                    onChange={(e) => setFormData({ ...formData, nombres: e.target.value })}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase text-slate-400">Apellidos</label>
                  <input
                    className="w-full rounded-lg border border-slate-600 bg-slate-700 px-4 py-2 text-white placeholder-slate-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
                    type="text"
                    placeholder="Pérez"
                    value={formData.apellidos}
                    onChange={(e) => setFormData({ ...formData, apellidos: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase text-slate-400">Teléfono</label>
                <input
                  className="w-full rounded-lg border border-slate-600 bg-slate-700 px-4 py-2 text-white placeholder-slate-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
                  type="tel"
                  placeholder="+506 0000-0000"
                  value={formData.telefono}
                  onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase text-slate-400">Dirección</label>
                <input
                  className="w-full rounded-lg border border-slate-600 bg-slate-700 px-4 py-2 text-white placeholder-slate-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
                  type="text"
                  placeholder="Calle Principal 123"
                  value={formData.direccion}
                  onChange={(e) => setFormData({ ...formData, direccion: e.target.value })}
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 border-t border-slate-700 bg-slate-900/50 p-6">
              <button
                onClick={closeModal}
                className="rounded-lg px-5 py-2.5 text-sm font-bold text-slate-400 transition-colors hover:text-slate-200"
              >
                Cancelar
              </button>
              <button
                onClick={handleSaveClient}
                className="rounded-lg bg-gradient-to-r from-purple-600 to-purple-700 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-purple-500/20 transition-all hover:from-purple-700 hover:to-purple-800"
              >
                {editingCedula ? 'Actualizar Cliente' : 'Guardar Cliente'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
