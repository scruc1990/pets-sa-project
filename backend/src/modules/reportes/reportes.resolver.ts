import { Args, Query, Resolver } from '@nestjs/graphql';
import { ReportesService } from './reportes.service';
import { AuditoriaMedicamentosClientesQueryDto } from './dto/auditoria-medicamentos-clientes.query.dto';
import {
  AuditoriaMedicamentosClientesReportType,
  ResumenDashboardType,
} from './graphql/reportes.types';

@Resolver(() => AuditoriaMedicamentosClientesReportType)
export class ReportesResolver {
  constructor(private readonly reportesService: ReportesService) {}

  @Query(() => AuditoriaMedicamentosClientesReportType, {
    name: 'auditoriaMedicamentosClientes',
  })
  async getAuditoriaMedicamentosClientes(
    @Args() query: AuditoriaMedicamentosClientesQueryDto,
  ) {
    const reporte = await this.reportesService.getAuditoriaMedicamentosClientes(query);

    return {
      generadoEn: new Date(reporte.generadoEn),
      filtrosAplicados: reporte.filtrosAplicados,
      totalRegistros: reporte.totalRegistros,
      totalInconsistencias: reporte.totalInconsistencias,
      resumenPorCliente: Object.entries(reporte.resumenPorCliente).map(
        ([clienteCedula, value]) => ({
          clienteCedula,
          clienteNombreCompleto: value.clienteNombreCompleto,
          totalMascotas: value.totalMascotas,
        }),
      ),
      resumenPorMedicamento: Object.entries(reporte.resumenPorMedicamento).map(
        ([medicamentoId, value]) => ({
          medicamentoId: Number(medicamentoId),
          medicamentoNombre: value.medicamentoNombre,
          totalMascotas: value.totalMascotas,
        }),
      ),
      detalles: reporte.detalles,
    };
  }

  @Query(() => ResumenDashboardType, { name: 'resumenDashboard' })
  getResumenDashboard() {
    return this.reportesService.getResumenDashboard();
  }
}