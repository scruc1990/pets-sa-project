import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { domainAPI } from '../../api/domain'
import { DataTable } from '../../components/common/DataTable'
import { Button } from '../../components/ui/Button'
import type { Cliente, Mascota, Medicamento } from '../../types/domain'

export function PetsPage() {
  const navigate = useNavigate()
  const [pets, setPets] = useState<Mascota[]>([])
  const [clientes, setClientes] = useState<Cliente[]>([])
  const [medicamentos, setMedicamentos] = useState<Medicamento[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    void loadData()
  }, [])

  const loadData = async () => {
    try {
      setLoading(true)
      const [petsData, clientesData, medsData] = await Promise.all([
        domainAPI.getMascotas(),
        domainAPI.getClientes(),
        domainAPI.getMedicamentos(),
      ])
      setPets(petsData)
      setClientes(clientesData)
      setMedicamentos(medsData)
    } catch (error) {
      console.error('Error loading data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDeletePet = async (id: string) => {
    if (confirm('¿Está seguro de que desea eliminar esta mascota?')) {
      try {
        await domainAPI.deleteMascota(id)
        await loadData()
      } catch (error) {
        console.error('Error deleting pet:', error)
      }
    }
  }

  const getMedicamentoNombre = (medicamentoId: number) => {
    return medicamentos.find((m) => m.id === medicamentoId)?.nombre ?? 'N/A'
  }

  const getClienteNombre = (clienteId: string) => {
    const cliente = clientes.find((c) => c.cedula === clienteId)
    return cliente ? `${cliente.nombres} ${cliente.apellidos}` : 'N/A'
  }

  const columns = useMemo(
    () => [
      {
        key: 'avatar',
        header: '',
        render: (pet: Mascota) => (
          <span className="inline-flex size-8 items-center justify-center rounded-full bg-purple-600/20 text-xs font-bold text-purple-400">
            {pet.nombre.charAt(0).toUpperCase()}
          </span>
        ),
      },
      {
        key: 'id',
        header: 'ID',
        render: (pet: Mascota) => `${pet.id.slice(0, 8)}...`,
      },
      { key: 'nombre', header: 'Nombre' },
      { key: 'raza', header: 'Raza' },
      {
        key: 'edad',
        header: 'Edad',
        render: (pet: Mascota) => `${pet.edad} años`,
      },
      {
        key: 'peso',
        header: 'Peso',
        render: (pet: Mascota) => `${pet.peso} kg`,
      },
      {
        key: 'medicamento',
        header: 'Medicamento',
        render: (pet: Mascota) => (
          <span className="rounded border border-purple-600/30 bg-purple-600/10 px-2 py-1 text-xs font-medium text-purple-400">
            {getMedicamentoNombre(pet.medicamentoId)}
          </span>
        ),
      },
      {
        key: 'cliente',
        header: 'Cliente',
        render: (pet: Mascota) => getClienteNombre(pet.clienteId),
      },
      {
        key: 'actions',
        header: 'Acciones',
        className: 'text-right',
        render: (pet: Mascota) => (
          <div className="space-x-2 text-right">
            <button
              onClick={() => navigate(`/pets/${pet.id}/edit`)}
              className="transition-colors hover:text-purple-400"
            >
              ✎
            </button>
            <button
              onClick={() => handleDeletePet(pet.id)}
              className="transition-colors hover:text-red-400"
            >
              🗑️
            </button>
          </div>
        ),
      },
    ],
    [clientes, medicamentos],
  )

  return (
    <div className="animate-in space-y-8 p-8 slide-in-from-right-2 duration-500">
      <header className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h2 className="text-3xl font-black tracking-tight text-white">Gestión de Mascotas</h2>
          <p className="mt-1 text-slate-400">Administra el registro completo de pacientes animales.</p>
        </div>
        <Button onClick={() => navigate('/pets/new')} leftIcon="➕">
          Nuevo Registro
        </Button>
      </header>

      <div className="overflow-hidden rounded-2xl border border-slate-700 bg-slate-800 shadow-sm p-4">
        {loading ? (
          <p className="py-8 text-center text-slate-400">Cargando...</p>
        ) : (
          <DataTable
            columns={columns}
            data={pets}
            emptyMessage="No hay mascotas registradas"
            rowKey={(row) => row.id}
          />
        )}
      </div>
    </div>
  )
}
