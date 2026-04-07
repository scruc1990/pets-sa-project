import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { MedicamentosService } from './medicamentos.service';
import { Medicamento } from './entities/medicamento.entity';
import { CreateMedicamentoDto } from './dto/create-medicamento.dto';
import { UpdateMedicamentoDto } from './dto/update-medicamento.dto';

@Resolver(() => Medicamento)
export class MedicamentosResolver {
  constructor(private readonly medicamentosService: MedicamentosService) {}

  @Mutation(() => Medicamento)
  createMedicamento(@Args('input') input: CreateMedicamentoDto) {
    return this.medicamentosService.create(input);
  }

  @Query(() => [Medicamento], { name: 'medicamentos' })
  findAllMedicamentos() {
    return this.medicamentosService.findAll();
  }

  @Query(() => Medicamento, { name: 'medicamento' })
  findMedicamento(@Args('id', { type: () => Int }) id: number) {
    return this.medicamentosService.findOne(id);
  }

  @Mutation(() => Medicamento)
  updateMedicamento(
    @Args('id', { type: () => Int }) id: number,
    @Args('input') input: UpdateMedicamentoDto,
  ) {
    return this.medicamentosService.update(id, input);
  }

  @Mutation(() => Medicamento)
  deleteMedicamento(@Args('id', { type: () => Int }) id: number) {
    return this.medicamentosService.remove(id);
  }
}