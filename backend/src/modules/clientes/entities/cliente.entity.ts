import { Field, ObjectType } from '@nestjs/graphql';
import { BaseEntity } from '../../../common/entities/base.entity';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Mascota } from '../../mascotas/entities/mascota.entity';

@ObjectType()
@Entity('clientes')
export class Cliente extends BaseEntity {
  @Field()
  @PrimaryColumn({ type: 'varchar', length: 20 })
  cedula: string;

  @Field()
  @Column({ type: 'varchar', length: 100 })
  nombres: string;

  @Field()
  @Column({ type: 'varchar', length: 100 })
  apellidos: string;

  @Field()
  @Column({ type: 'varchar', length: 200 })
  direccion: string;

  @Field()
  @Column({ type: 'varchar', length: 20 })
  telefono: string;

  @OneToMany(() => Mascota, (mascota) => mascota.cliente)
  mascotas: Mascota[];
}
