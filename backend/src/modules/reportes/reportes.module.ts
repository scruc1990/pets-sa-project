import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportesController } from './reportes.controller';
import { ReportesService } from './reportes.service';
import { Mascota } from '../mascotas/entities/mascota.entity';
import { Cliente } from '../clientes/entities/cliente.entity';
import { Medicamento } from '../medicamentos/entities/medicamento.entity';
import { ReportesResolver } from './reportes.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Mascota, Cliente, Medicamento])],
  controllers: [ReportesController],
  providers: [ReportesService, ReportesResolver],
})
export class ReportesModule {}
