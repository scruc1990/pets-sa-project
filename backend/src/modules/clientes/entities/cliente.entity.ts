import { BaseEntity } from '../../../common/entities/base.entity';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Mascota } from '../../mascotas/entities/mascota.entity';

@Entity('clientes')
export class Cliente extends BaseEntity {
  @PrimaryColumn({ type: 'varchar', length: 20 })
  cedula: string;

  @Column({ type: 'varchar', length: 100 })
  nombres: string;

  @Column({ type: 'varchar', length: 100 })
  apellidos: string;

  @Column({ type: 'varchar', length: 200 })
  direccion: string;

  @Column({ type: 'varchar', length: 20 })
  telefono: string;

  @OneToMany(() => Mascota, (mascota) => mascota.cliente)
  mascotas: Mascota[];
}
