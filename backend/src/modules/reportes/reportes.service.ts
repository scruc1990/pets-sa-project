import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuditoriaMedicamentosClientesQueryDto } from './dto/auditoria-medicamentos-clientes.query.dto';
import { Mascota } from '../mascotas/entities/mascota.entity';

@Injectable()
export class ReportesService {
  constructor(
    @InjectRepository(Mascota)
    private readonly mascotasRepository: Repository<Mascota>,
  ) {}

  async getAuditoriaMedicamentosClientes(
    query: AuditoriaMedicamentosClientesQueryDto,
  ) {
    const builder = this.mascotasRepository
      .createQueryBuilder('mascota')
      .leftJoinAndSelect('mascota.cliente', 'cliente')
      .leftJoinAndSelect('mascota.medicamento', 'medicamento');

    if (query.clienteId) {
      builder.andWhere('mascota.clienteId = :clienteId', {
        clienteId: query.clienteId,
      });
    }

    if (query.medicamentoId !== undefined) {
      builder.andWhere('mascota.medicamentoId = :medicamentoId', {
        medicamentoId: query.medicamentoId,
      });
    }

    const mascotas = await builder.orderBy('mascota.nombre', 'ASC').getMany();

    const detalles = mascotas.map((mascota) => {
      const cliente = mascota.cliente;
      const medicamento = mascota.medicamento;

      return {
        mascotaId: mascota.id,
        mascotaNombre: mascota.nombre,
        raza: mascota.raza,
        clienteCedula: mascota.clienteId,
        clienteNombreCompleto: cliente
          ? `${cliente.nombres} ${cliente.apellidos}`
          : 'Cliente no encontrado',
        medicamentoId: mascota.medicamentoId,
        medicamentoNombre: medicamento?.nombre ?? 'Medicamento no encontrado',
        medicamentoDosis: medicamento?.dosis ?? null,
        estadoAuditoria:
          cliente && medicamento ? 'CONSISTENTE' : 'INCONSISTENTE',
      };
    });

    const resumenPorCliente = detalles.reduce<
      Record<
        string,
        {
          clienteNombreCompleto: string;
          totalMascotas: number;
        }
      >
    >((accumulator, item) => {
      const key = item.clienteCedula;
      const current = accumulator[key] ?? {
        clienteNombreCompleto: item.clienteNombreCompleto,
        totalMascotas: 0,
      };

      current.totalMascotas += 1;
      accumulator[key] = current;
      return accumulator;
    }, {});

    const resumenPorMedicamento = detalles.reduce<
      Record<
        string,
        {
          medicamentoNombre: string;
          totalMascotas: number;
        }
      >
    >((accumulator, item) => {
      const key = `${item.medicamentoId}`;
      const current = accumulator[key] ?? {
        medicamentoNombre: item.medicamentoNombre,
        totalMascotas: 0,
      };

      current.totalMascotas += 1;
      accumulator[key] = current;
      return accumulator;
    }, {});

    return {
      generadoEn: new Date().toISOString(),
      filtrosAplicados: {
        clienteId: query.clienteId ?? null,
        medicamentoId: query.medicamentoId ?? null,
      },
      totalRegistros: detalles.length,
      totalInconsistencias: detalles.filter(
        (item) => item.estadoAuditoria === 'INCONSISTENTE',
      ).length,
      resumenPorCliente,
      resumenPorMedicamento,
      detalles,
    };
  }
}
