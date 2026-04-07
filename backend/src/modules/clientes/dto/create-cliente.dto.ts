import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, Length, Matches } from 'class-validator';

@InputType()
export class CreateClienteDto {
  @Field()
  @IsString()
  @IsNotEmpty()
  @Length(6, 20)
  @Matches(/^[0-9]+$/, { message: 'La cédula solo debe contener números' })
  cedula: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  @Length(2, 100)
  nombres: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  @Length(2, 100)
  apellidos: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  @Length(5, 200)
  direccion: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  @Length(7, 20)
  telefono: string;
}
