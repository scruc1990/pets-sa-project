import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { BaseService } from '../../common/services/base.service';
import { Cliente } from './entities/cliente.entity';

@Injectable()
export class ClientesService extends BaseService {
  constructor(
    @InjectRepository(Cliente)
    private readonly clientesRepository: Repository<Cliente>,
  ) {
    super('Cliente');
  }

  async create(createClienteDto: CreateClienteDto) {
    const existingCliente = await this.clientesRepository.findOneBy({
      cedula: createClienteDto.cedula,
    });

    if (existingCliente) {
      throw new ConflictException(
        `Ya existe un cliente con cédula ${createClienteDto.cedula}`,
      );
    }

    const cliente = this.clientesRepository.create(createClienteDto);
    return this.clientesRepository.save(cliente);
  }

  findAll() {
    return this.clientesRepository.find({
      order: { nombres: 'ASC' },
    });
  }

  async findOne(cedula: string) {
    this.ensureId(cedula);

    const cliente = await this.clientesRepository.findOneBy({ cedula });
    if (!cliente) {
      this.throwNotFound(cedula);
    }

    return cliente;
  }

  async update(cedula: string, updateClienteDto: UpdateClienteDto) {
    this.ensureId(cedula);

    const cliente = await this.findOne(cedula);
    const updatedCliente = this.clientesRepository.merge(cliente, updateClienteDto);
    return this.clientesRepository.save(updatedCliente);
  }

  async remove(cedula: string) {
    this.ensureId(cedula);

    const cliente = await this.findOne(cedula);
    await this.clientesRepository.remove(cliente);
    return cliente;
  }
}
