import { InputType, PartialType } from '@nestjs/graphql';
import { CreateMascotaDto } from './create-mascota.dto';

@InputType()
export class UpdateMascotaDto extends PartialType(CreateMascotaDto) {}
