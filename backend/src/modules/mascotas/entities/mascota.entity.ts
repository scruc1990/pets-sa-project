import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { BaseEntity } from '../../../common/entities/base.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Cliente } from '../../clientes/entities/cliente.entity';
import { Medicamento } from '../../medicamentos/entities/medicamento.entity';

@ObjectType()
@Entity('mascotas')
export class Mascota extends BaseEntity {
  @Field(() => String)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column({ type: 'varchar', length: 100 })
  nombre: string;

  @Field()
  @Column({ type: 'varchar', length: 100 })
  raza: string;

  @Field(() => Int)
  @Column({ type: 'int' })
  edad: number;

  @Field(() => Float)
  @Column({ type: 'float' })
  peso: number;

  @Field(() => Int)
  @Column({ type: 'int' })
  medicamentoId: number;

  @Field()
  @Column({ type: 'varchar', length: 20 })
  clienteId: string;

  @Field(() => Medicamento, { nullable: true })
  @ManyToOne(() => Medicamento, (medicamento) => medicamento.mascotas, {
    nullable: false,
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'medicamentoId' })
  medicamento: Medicamento;

  @Field(() => Cliente, { nullable: true })
  @ManyToOne(() => Cliente, (cliente) => cliente.mascotas, {
    nullable: false,
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'clienteId', referencedColumnName: 'cedula' })
  cliente: Cliente;
}
