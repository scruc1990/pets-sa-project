import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicamentosService } from './medicamentos.service';
import { MedicamentosController } from './medicamentos.controller';
import { Medicamento } from './entities/medicamento.entity';
import { MedicamentosResolver } from './medicamentos.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Medicamento])],
  controllers: [MedicamentosController],
  providers: [MedicamentosService, MedicamentosResolver],
  exports: [MedicamentosService],
})
export class MedicamentosModule {}
