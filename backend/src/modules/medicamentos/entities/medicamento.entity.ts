import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseEntity } from '../../../common/entities/base.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Mascota } from '../../mascotas/entities/mascota.entity';

@ObjectType()
@Entity('medicamentos')
export class Medicamento extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ type: 'varchar', length: 120 })
  nombre: string;

  @Field()
  @Column({ type: 'varchar', length: 500 })
  descripcion: string;

  @Field()
  @Column({ type: 'varchar', length: 120 })
  dosis: string;

  @OneToMany(() => Mascota, (mascota) => mascota.medicamento)
  mascotas: Mascota[];
}
