import { Field, GraphQLISODateTime, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AuditoriaFiltroAplicadoType {
  @Field({ nullable: true })
  clienteId?: string | null;

  @Field(() => Int, { nullable: true })
  medicamentoId?: number | null;
}

@ObjectType()
export class AuditoriaDetalleType {
  @Field()
  mascotaId: string;

  @Field()
  mascotaNombre: string;

  @Field()
  raza: string;

  @Field()
  clienteCedula: string;

  @Field()
  clienteNombreCompleto: string;

  @Field(() => Int)
  medicamentoId: number;

  @Field()
  medicamentoNombre: string;

  @Field({ nullable: true })
  medicamentoDosis?: string | null;

  @Field()
  estadoAuditoria: string;
}

@ObjectType()
export class ResumenClienteType {
  @Field()
  clienteCedula: string;

  @Field()
  clienteNombreCompleto: string;

  @Field(() => Int)
  totalMascotas: number;
}

@ObjectType()
export class ResumenMedicamentoType {
  @Field(() => Int)
  medicamentoId: number;

  @Field()
  medicamentoNombre: string;

  @Field(() => Int)
  totalMascotas: number;
}

@ObjectType()
export class AuditoriaMedicamentosClientesReportType {
  @Field(() => GraphQLISODateTime)
  generadoEn: Date;

  @Field(() => AuditoriaFiltroAplicadoType)
  filtrosAplicados: AuditoriaFiltroAplicadoType;

  @Field(() => Int)
  totalRegistros: number;

  @Field(() => Int)
  totalInconsistencias: number;

  @Field(() => [ResumenClienteType])
  resumenPorCliente: ResumenClienteType[];

  @Field(() => [ResumenMedicamentoType])
  resumenPorMedicamento: ResumenMedicamentoType[];

  @Field(() => [AuditoriaDetalleType])
  detalles: AuditoriaDetalleType[];
}

@ObjectType()
export class MedicamentoConteoType {
  @Field(() => Int)
  medicamentoId: number;

  @Field()
  medicamentoNombre: string;

  @Field(() => Int)
  totalMascotas: number;
}

@ObjectType()
export class ResumenDashboardType {
  @Field(() => Int)
  totalClientes: number;

  @Field(() => Int)
  totalMedicamentos: number;

  @Field(() => Int)
  totalMascotas: number;

  @Field(() => [MedicamentoConteoType])
  mascotasPorMedicamento: MedicamentoConteoType[];
}