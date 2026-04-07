import { InputType, PartialType } from '@nestjs/graphql';
import { CreateMedicamentoDto } from './create-medicamento.dto';

@InputType()
export class UpdateMedicamentoDto extends PartialType(CreateMedicamentoDto) {}
