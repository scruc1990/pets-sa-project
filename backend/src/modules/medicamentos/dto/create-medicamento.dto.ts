import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateMedicamentoDto {
	@IsString()
	@IsNotEmpty()
	@Length(2, 120)
	nombre: string;

	@IsString()
	@IsNotEmpty()
	@Length(5, 500)
	descripcion: string;

	@IsString()
	@IsNotEmpty()
	@Length(2, 120)
	dosis: string;
}
