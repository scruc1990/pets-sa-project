import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMascotaDto } from './dto/create-mascota.dto';
import { UpdateMascotaDto } from './dto/update-mascota.dto';
import { BaseService } from '../../common/services/base.service';
import { Mascota } from './entities/mascota.entity';
import { Cliente } from '../clientes/entities/cliente.entity';
import { Medicamento } from '../medicamentos/entities/medicamento.entity';

@Injectable()
export class MascotasService extends BaseService {
  constructor(
    @InjectRepository(Mascota)
    private readonly mascotasRepository: Repository<Mascota>,
    @InjectRepository(Cliente)
    private readonly clientesRepository: Repository<Cliente>,
    @InjectRepository(Medicamento)
    private readonly medicamentosRepository: Repository<Medicamento>,
  ) {
    super('Mascota');
  }

  async create(createMascotaDto: CreateMascotaDto) {
    const [cliente, medicamento] = await Promise.all([
      this.clientesRepository.findOneBy({ cedula: createMascotaDto.clienteId }),
      this.medicamentosRepository.findOneBy({
        id: createMascotaDto.medicamentoId,
      }),
    ]);

    if (!cliente) {
      this.throwNotFound(createMascotaDto.clienteId);
    }

    if (!medicamento) {
      this.throwNotFound(createMascotaDto.medicamentoId);
    }

    const mascota = this.mascotasRepository.create(createMascotaDto);
    const savedMascota = await this.mascotasRepository.save(mascota);
    return this.findOne(savedMascota.id);
  }

  findAll() {
    return this.mascotasRepository.find({
      relations: {
        cliente: true,
        medicamento: true,
      },
      order: { nombre: 'ASC' },
    });
  }

  async findOne(id: string) {
    this.ensureId(id);

    const mascota = await this.mascotasRepository.findOne({
      where: { id },
      relations: {
        cliente: true,
        medicamento: true,
      },
    });
    if (!mascota) {
      this.throwNotFound(id);
    }

    return mascota;
  }

  async update(id: string, updateMascotaDto: UpdateMascotaDto) {
    this.ensureId(id);

    const mascota = await this.findOne(id);

    if (updateMascotaDto.clienteId) {
      const cliente = await this.clientesRepository.findOneBy({
        cedula: updateMascotaDto.clienteId,
      });
      if (!cliente) {
        this.throwNotFound(updateMascotaDto.clienteId);
      }
    }

    if (updateMascotaDto.medicamentoId) {
      const medicamento = await this.medicamentosRepository.findOneBy({
        id: updateMascotaDto.medicamentoId,
      });
      if (!medicamento) {
        this.throwNotFound(updateMascotaDto.medicamentoId);
      }
    }

    const updatedMascota = this.mascotasRepository.merge(
      mascota,
      updateMascotaDto,
    );
    await this.mascotasRepository.save(updatedMascota);
    return this.findOne(id);
  }

  async remove(id: string) {
    this.ensureId(id);

    const mascota = await this.findOne(id);
    const deletedMascota = { ...mascota };
    await this.mascotasRepository.remove(mascota);
    return deletedMascota;
  }
}
