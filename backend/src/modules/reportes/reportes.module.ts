import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportesController } from './reportes.controller';
import { ReportesService } from './reportes.service';
import { Mascota } from '../mascotas/entities/mascota.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Mascota])],
  controllers: [ReportesController],
  providers: [ReportesService],
})
export class ReportesModule {}
