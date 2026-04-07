import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, Length } from 'class-validator';

@InputType()
export class CreateMedicamentoDto {
  @Field()
  @IsString()
  @IsNotEmpty()
  @Length(2, 120)
  nombre: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  @Length(5, 500)
  descripcion: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  @Length(2, 120)
  dosis: string;
}
