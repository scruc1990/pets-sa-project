import { IsNotEmpty, IsString, Length, Matches } from 'class-validator';

export class CreateClienteDto {
	@IsString()
	@IsNotEmpty()
	@Length(6, 20)
	@Matches(/^[0-9]+$/, { message: 'La cédula solo debe contener números' })
	cedula: string;

	@IsString()
	@IsNotEmpty()
	@Length(2, 100)
	nombres: string;

	@IsString()
	@IsNotEmpty()
	@Length(2, 100)
	apellidos: string;

	@IsString()
	@IsNotEmpty()
	@Length(5, 200)
	direccion: string;

	@IsString()
	@IsNotEmpty()
	@Length(7, 20)
	telefono: string;
}
