import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString, Length, Min } from 'class-validator';

export class AuditoriaMedicamentosClientesQueryDto {
  @IsOptional()
  @IsString()
  @Length(6, 20)
  clienteId?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  medicamentoId?: number;
}