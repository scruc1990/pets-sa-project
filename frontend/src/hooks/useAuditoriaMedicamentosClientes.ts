import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getAuditoriaMedicamentosClientes } from '../api/reportes'

export function useAuditoriaMedicamentosClientes() {
  const { data, isLoading, isError, error, refetch, isFetching } = useQuery({
    queryKey: ['auditoria-medicamentos-clientes'],
    queryFn: getAuditoriaMedicamentosClientes,
  })

  const detalleColumns = useMemo(
    () => [
      { key: 'mascotaNombre', header: 'Mascota' },
      { key: 'raza', header: 'Raza' },
      { key: 'clienteNombreCompleto', header: 'Cliente' },
      { key: 'medicamentoNombre', header: 'Medicamento' },
      { key: 'medicamentoDosis', header: 'Dosis' },
    ],
    [],
  )

  const resumenClienteRows = useMemo(() => {
    if (!data) {
      return []
    }

    return Object.entries(data.resumenPorCliente).map(([cedula, value]) => ({
      cedula,
      nombre: value.clienteNombreCompleto,
      totalMascotas: value.totalMascotas,
    }))
  }, [data])

  const resumenMedicamentoRows = useMemo(() => {
    if (!data) {
      return []
    }

    return Object.entries(data.resumenPorMedicamento).map(([id, value]) => ({
      medicamentoId: id,
      medicamentoNombre: value.medicamentoNombre,
      totalMascotas: value.totalMascotas,
    }))
  }, [data])

  return {
    data,
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
    detalleColumns,
    resumenClienteRows,
    resumenMedicamentoRows,
  }
}
