import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { domainAPI } from '../api/domain'
import type { Mascota, Medicamento } from '../types/domain'

export function PetsPage() {
  const navigate = useNavigate()
  const [pets, setPets] = useState<Mascota[]>([])
  const [medicamentos, setMedicamentos] = useState<Medicamento[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      setLoading(true)
      const [petsData, medsData] = await Promise.all([
        domainAPI.getMascotas(),
        domainAPI.getMedicamentos(),
      ])
      setPets(petsData)
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
        loadData()
      } catch (error) {
        console.error('Error deleting pet:', error)
      }
    }
  }

  const getMedicamentoNombre = (medicamentoId: number) => {
    return medicamentos.find((m) => m.id === medicamentoId)?.nombre ?? 'N/A'
  }

  const getColorBg = (idx: number) => {
    const colors = [
      'from-purple-600 to-purple-700',
      'from-blue-600 to-blue-700',
      'from-amber-600 to-amber-700',
      'from-green-600 to-green-700',
    ]
    return colors[idx % colors.length]
  }

  return (
    <div className="animate-in space-y-8 p-8 slide-in-from-right-2 duration-500">
      <header className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h2 className="text-3xl font-black tracking-tight text-white">
            Gestión de Mascotas
          </h2>
          <p className="mt-1 text-slate-400">
            Administra el registro completo de pacientes animales.
          </p>
        </div>
        <button
          onClick={() => navigate('/pets/new')}
          className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-purple-600 to-purple-700 px-6 py-2.5 font-bold text-white shadow-md shadow-purple-500/10 transition-all hover:from-purple-700 hover:to-purple-800"
        >
          <span>➕</span>
          Nuevo Registro
        </button>
      </header>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-700 bg-slate-800 shadow-sm">
        <table className="w-full text-left text-white">
          <thead className="border-b border-slate-700 bg-slate-900/50">
            <tr>
              <th className="px-6 py-4 text-center text-xs font-bold uppercase tracking-widest text-slate-400">
              </th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-400">
                ID
              </th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-400">
                Nombre
              </th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-400">
                Raza
              </th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-400">
                Edad
              </th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-400">
                Peso
              </th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-400">
                Medicamento
              </th>
              <th className="px-6 py-4 text-right text-xs font-bold uppercase tracking-widest text-slate-400">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700">
            {loading ? (
              <tr>
                <td colSpan={8} className="px-6 py-8 text-center text-slate-400">
                  Cargando...
                </td>
              </tr>
            ) : pets.length > 0 ? (
              pets.map((pet, idx) => (
                <tr key={pet.id} className="transition-colors hover:bg-slate-700/30">
                  <td className="px-6 py-4">
                    <div className="flex justify-center">
                      <div
                        className={`flex size-12 items-center justify-center rounded-full border-2 border-slate-700 bg-gradient-to-br ${getColorBg(idx)} text-lg font-bold text-white shadow-sm`}
                      >
                        {pet.nombre.charAt(0).toUpperCase()}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-xs font-mono text-slate-400">
                    {pet.id?.slice(0, 8)}...
                  </td>
                  <td className="px-6 py-4 font-bold text-white">{pet.nombre}</td>
                  <td className="px-6 py-4 text-sm text-slate-300">{pet.raza}</td>
                  <td className="px-6 py-4 text-sm text-slate-300">{pet.edad} años</td>
                  <td className="px-6 py-4 text-sm text-slate-300">{pet.peso} kg</td>
                  <td className="px-6 py-4 text-sm">
                    <span className="rounded border border-purple-600/30 bg-purple-600/10 px-2 py-1 text-xs font-medium text-purple-400">
                      {getMedicamentoNombre(pet.medicamentoId)}
                    </span>
                  </td>
                  <td className="space-x-2 px-6 py-4 text-right">
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
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="px-6 py-8 text-center text-slate-400">
                  No hay mascotas registradas
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="flex items-center justify-between border-t border-slate-700 bg-slate-900/50 px-6 py-4">
          <p className="text-sm text-slate-400">Mostrando {pets.length} de {pets.length} resultados</p>
          <div className="flex gap-1">
            <button className="flex size-8 items-center justify-center rounded-lg bg-purple-600 font-bold text-white">
              1
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
