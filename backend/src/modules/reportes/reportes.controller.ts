import { Controller, Get, Query } from '@nestjs/common';
import { ReportesService } from './reportes.service';
import { AuditoriaMedicamentosClientesQueryDto } from './dto/auditoria-medicamentos-clientes.query.dto';

@Controller('reportes')
export class ReportesController {
  constructor(private readonly reportesService: ReportesService) {}

  @Get('auditoria/medicamentos-clientes')
  getAuditoriaMedicamentosClientes(
    @Query() query: AuditoriaMedicamentosClientesQueryDto,
  ) {
    return this.reportesService.getAuditoriaMedicamentosClientes(query);
  }
}
