export type AuditoriaDetalle = {
  mascotaId: string
  mascotaNombre: string
  raza: string
  clienteCedula: string
  clienteNombreCompleto: string
  medicamentoId: number
  medicamentoNombre: string
  medicamentoDosis: string | null
  estadoAuditoria: 'CONSISTENTE' | 'INCONSISTENTE'
}

export type AuditoriaResponse = {
  generadoEn: string
  filtrosAplicados: {
    clienteId: string | null
    medicamentoId: number | null
  }
  totalRegistros: number
  totalInconsistencias: number
  resumenPorCliente: Record<
    string,
    {
      clienteNombreCompleto: string
      totalMascotas: number
    }
  >
  resumenPorMedicamento: Record<
    string,
    {
      medicamentoNombre: string
      totalMascotas: number
    }
  >
  detalles: AuditoriaDetalle[]
}
