import { gql } from '@apollo/client';

export type AuditoriaDetalleGraphQL = {
  mascotaId: string;
  mascotaNombre: string;
  raza: string;
  clienteCedula: string;
  clienteNombreCompleto: string;
  medicamentoId: number;
  medicamentoNombre: string;
  medicamentoDosis: string | null;
  estadoAuditoria: 'CONSISTENTE' | 'INCONSISTENTE';
};

export type AuditoriaMedicamentosClientesGraphQL = {
  generadoEn: string;
  filtrosAplicados: {
    clienteId: string | null;
    medicamentoId: number | null;
  };
  totalRegistros: number;
  totalInconsistencias: number;
  resumenPorCliente: Array<{
    clienteCedula: string;
    clienteNombreCompleto: string;
    totalMascotas: number;
  }>;
  resumenPorMedicamento: Array<{
    medicamentoId: number;
    medicamentoNombre: string;
    totalMascotas: number;
  }>;
  detalles: AuditoriaDetalleGraphQL[];
};

export type ResumenDashboardGraphQL = {
  totalClientes: number;
  totalMedicamentos: number;
  totalMascotas: number;
  mascotasPorMedicamento: Array<{
    medicamentoId: number;
    medicamentoNombre: string;
    totalMascotas: number;
  }>;
};

export const GET_AUDITORIA_MEDICAMENTOS_CLIENTES = gql`
  query GetAuditoriaMedicamentosClientes($clienteId: String, $medicamentoId: Int) {
    auditoriaMedicamentosClientes(
      clienteId: $clienteId
      medicamentoId: $medicamentoId
    ) {
      generadoEn
      filtrosAplicados {
        clienteId
        medicamentoId
      }
      totalRegistros
      totalInconsistencias
      resumenPorCliente {
        clienteCedula
        clienteNombreCompleto
        totalMascotas
      }
      resumenPorMedicamento {
        medicamentoId
        medicamentoNombre
        totalMascotas
      }
      detalles {
        mascotaId
        mascotaNombre
        raza
        clienteCedula
        clienteNombreCompleto
        medicamentoId
        medicamentoNombre
        medicamentoDosis
        estadoAuditoria
      }
    }
  }
`;

export const GET_RESUMEN_DASHBOARD = gql`
  query GetResumenDashboard {
    resumenDashboard {
      totalClientes
      totalMedicamentos
      totalMascotas
      mascotasPorMedicamento {
        medicamentoId
        medicamentoNombre
        totalMascotas
      }
    }
  }
`;