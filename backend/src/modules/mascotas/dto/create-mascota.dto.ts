import { Type } from 'class-transformer';
import {
	IsInt,
	IsNotEmpty,
	IsNumber,
	IsPositive,
	IsString,
	Length,
	Max,
	Min,
} from 'class-validator';

export class CreateMascotaDto {
	@IsString()
	@IsNotEmpty()
	@Length(2, 100)
	nombre: string;

	@IsString()
	@IsNotEmpty()
	@Length(2, 100)
	raza: string;

	@Type(() => Number)
	@IsInt()
	@Min(0)
	@Max(60)
	edad: number;

	@Type(() => Number)
	@IsNumber({ maxDecimalPlaces: 2 })
	@IsPositive()
	peso: number;

	@Type(() => Number)
	@IsInt()
	@IsPositive()
	medicamentoId: number;

	@IsString()
	@IsNotEmpty()
	@Length(6, 20)
	clienteId: string;
}
