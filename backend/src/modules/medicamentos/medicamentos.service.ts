import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMedicamentoDto } from './dto/create-medicamento.dto';
import { UpdateMedicamentoDto } from './dto/update-medicamento.dto';
import { BaseService } from '../../common/services/base.service';
import { Medicamento } from './entities/medicamento.entity';

@Injectable()
export class MedicamentosService extends BaseService {
  constructor(
    @InjectRepository(Medicamento)
    private readonly medicamentosRepository: Repository<Medicamento>,
  ) {
    super('Medicamento');
  }

  create(createMedicamentoDto: CreateMedicamentoDto) {
    const medicamento = this.medicamentosRepository.create(createMedicamentoDto);
    return this.medicamentosRepository.save(medicamento);
  }

  findAll() {
    return this.medicamentosRepository.find({
      order: { id: 'ASC' },
    });
  }

  async findOne(id: number) {
    this.ensureId(id);

    const medicamento = await this.medicamentosRepository.findOneBy({ id });
    if (!medicamento) {
      this.throwNotFound(id);
    }

    return medicamento;
  }

  async update(id: number, updateMedicamentoDto: UpdateMedicamentoDto) {
    this.ensureId(id);

    const medicamento = await this.findOne(id);
    const updatedMedicamento = this.medicamentosRepository.merge(
      medicamento,
      updateMedicamentoDto,
    );
    return this.medicamentosRepository.save(updatedMedicamento);
  }

  async remove(id: number) {
    this.ensureId(id);

    const medicamento = await this.findOne(id);
    const deletedMedicamento = { ...medicamento };
    await this.medicamentosRepository.remove(medicamento);
    return deletedMedicamento;
  }
}
