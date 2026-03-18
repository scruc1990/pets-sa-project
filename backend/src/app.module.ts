import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { ClientesModule } from './modules/clientes/clientes.module';
import { MascotasModule } from './modules/mascotas/mascotas.module';
import { MedicamentosModule } from './modules/medicamentos/medicamentos.module';
import { ReportesModule } from './modules/reportes/reportes.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [join(__dirname, '..', '.env'), '.env'],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST', 'localhost'),
        port: Number(configService.get<string>('DB_PORT', '5432')),
        username: configService.get<string>('DB_USERNAME', 'postgres'),
        password: configService.get<string>('DB_PASSWORD', 'postgres'),
        database: configService.get<string>('DB_NAME', 'pets_sa'),
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    ClientesModule,
    MascotasModule,
    MedicamentosModule,
    ReportesModule,
  ],
})
export class AppModule {}
