import { InputType, OmitType, PartialType } from '@nestjs/graphql';
import { CreateClienteDto } from './create-cliente.dto';

@InputType()
export class UpdateClienteDto extends PartialType(
  OmitType(CreateClienteDto, ['cedula'] as const),
) {}
