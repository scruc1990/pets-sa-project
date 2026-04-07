import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString, Length, Min } from 'class-validator';

@ArgsType()
export class AuditoriaMedicamentosClientesQueryDto {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @Length(6, 20)
  clienteId?: string;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  medicamentoId?: number;
}