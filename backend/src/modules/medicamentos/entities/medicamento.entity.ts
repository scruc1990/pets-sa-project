import { BaseEntity } from '../../../common/entities/base.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Mascota } from '../../mascotas/entities/mascota.entity';

@Entity('medicamentos')
export class Medicamento extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 120 })
  nombre: string;

  @Column({ type: 'varchar', length: 500 })
  descripcion: string;

  @Column({ type: 'varchar', length: 120 })
  dosis: string;

  @OneToMany(() => Mascota, (mascota) => mascota.medicamento)
  mascotas: Mascota[];
}
