import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MascotasService } from './mascotas.service';
import { MascotasController } from './mascotas.controller';
import { Mascota } from './entities/mascota.entity';
import { Cliente } from '../clientes/entities/cliente.entity';
import { Medicamento } from '../medicamentos/entities/medicamento.entity';
import { MascotasResolver } from './mascotas.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Mascota, Cliente, Medicamento])],
  controllers: [MascotasController],
  providers: [MascotasService, MascotasResolver],
  exports: [MascotasService],
})
export class MascotasModule {}
