import { useMemo } from 'react';
import { useQuery } from '@apollo/client/react';
import {
  GET_AUDITORIA_MEDICAMENTOS_CLIENTES,
  type AuditoriaMedicamentosClientesGraphQL,
} from '../graphql/reportes';

export function useAuditoriaMedicamentosClientes() {
  const { data, loading, error, refetch, networkStatus } = useQuery<{
    auditoriaMedicamentosClientes: AuditoriaMedicamentosClientesGraphQL;
  }>(GET_AUDITORIA_MEDICAMENTOS_CLIENTES, {
    notifyOnNetworkStatusChange: true,
  });

  const detailData = data?.auditoriaMedicamentosClientes;

  const detalleColumns = useMemo(
    () => [
      { key: 'mascotaNombre', header: 'Mascota' },
      { key: 'raza', header: 'Raza' },
      { key: 'clienteNombreCompleto', header: 'Cliente' },
      { key: 'medicamentoNombre', header: 'Medicamento' },
      { key: 'medicamentoDosis', header: 'Dosis' },
    ],
    [],
  );

  const resumenClienteRows = useMemo(() => {
    if (!detailData) {
      return [];
    }

    return detailData.resumenPorCliente.map(
      (item: AuditoriaMedicamentosClientesGraphQL['resumenPorCliente'][number]) => ({
        cedula: item.clienteCedula,
        nombre: item.clienteNombreCompleto,
        totalMascotas: item.totalMascotas,
      }),
    );
  }, [detailData]);

  const resumenMedicamentoRows = useMemo(() => {
    if (!detailData) {
      return [];
    }

    return detailData.resumenPorMedicamento.map(
      (item: AuditoriaMedicamentosClientesGraphQL['resumenPorMedicamento'][number]) => ({
        medicamentoId: String(item.medicamentoId),
        medicamentoNombre: item.medicamentoNombre,
        totalMascotas: item.totalMascotas,
      }),
    );
  }, [detailData]);

  return {
    data: detailData,
    isLoading: loading,
    isError: Boolean(error),
    error,
    refetch,
    isFetching: networkStatus === 4,
    detalleColumns,
    resumenClienteRows,
    resumenMedicamentoRows,
  };
}
