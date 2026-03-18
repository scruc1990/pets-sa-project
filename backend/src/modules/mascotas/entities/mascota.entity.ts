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

@Entity('mascotas')
export class Mascota extends BaseEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ type: 'varchar', length: 100 })
	nombre: string;

	@Column({ type: 'varchar', length: 100 })
	raza: string;

	@Column({ type: 'int' })
	edad: number;

	@Column({ type: 'float' })
	peso: number;

	@Column({ type: 'int' })
	medicamentoId: number;

	@Column({ type: 'varchar', length: 20 })
	clienteId: string;

	@ManyToOne(() => Medicamento, (medicamento) => medicamento.mascotas, {
		nullable: false,
		onDelete: 'RESTRICT',
	})
	@JoinColumn({ name: 'medicamentoId' })
	medicamento: Medicamento;

	@ManyToOne(() => Cliente, (cliente) => cliente.mascotas, {
		nullable: false,
		onDelete: 'RESTRICT',
	})
	@JoinColumn({ name: 'clienteId', referencedColumnName: 'cedula' })
	cliente: Cliente;
}
