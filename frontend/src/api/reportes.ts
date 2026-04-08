import { apolloClient } from '../graphql/client';
import {
  GET_AUDITORIA_MEDICAMENTOS_CLIENTES,
  GET_RESUMEN_DASHBOARD,
  type AuditoriaMedicamentosClientesGraphQL,
  type ResumenDashboardGraphQL,
} from '../graphql/reportes';
import type { AuditoriaResponse } from '../types/reportes';

type AuditoriaQueryResult = {
  auditoriaMedicamentosClientes: AuditoriaMedicamentosClientesGraphQL;
};

type DashboardQueryResult = {
  resumenDashboard: ResumenDashboardGraphQL;
};

export async function getAuditoriaMedicamentosClientes() {
  try {
    const { data } = await apolloClient.query<AuditoriaQueryResult>({
      query: GET_AUDITORIA_MEDICAMENTOS_CLIENTES,
      fetchPolicy: 'network-only',
    });

    const reporte = data.auditoriaMedicamentosClientes;

    const resumenPorCliente = Object.fromEntries(
      reporte.resumenPorCliente.map((item) => [item.clienteCedula, {
        clienteNombreCompleto: item.clienteNombreCompleto,
        totalMascotas: item.totalMascotas,
      }]),
    );

    const resumenPorMedicamento = Object.fromEntries(
      reporte.resumenPorMedicamento.map((item) => [String(item.medicamentoId), {
        medicamentoNombre: item.medicamentoNombre,
        totalMascotas: item.totalMascotas,
      }]),
    );

    return {
      generadoEn: reporte.generadoEn,
      filtrosAplicados: reporte.filtrosAplicados,
      totalRegistros: reporte.totalRegistros,
      totalInconsistencias: reporte.totalInconsistencias,
      resumenPorCliente,
      resumenPorMedicamento,
      detalles: reporte.detalles,
    } satisfies AuditoriaResponse;
  } catch (error) {
    throw new Error('No fue posible cargar el reporte de auditoría');
  }
}

export async function getResumenDashboard() {
  const { data } = await apolloClient.query<DashboardQueryResult>({
    query: GET_RESUMEN_DASHBOARD,
    fetchPolicy: 'network-only',
  });

  return data.resumenDashboard;
}

export const reportesAPI = {
  getAuditoriaMedicamentosClientes,
  getResumenDashboard,
};

export default reportesAPI;
