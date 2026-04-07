import { Field, Float, InputType, Int } from '@nestjs/graphql';
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

@InputType()
export class CreateMascotaDto {
  @Field()
  @IsString()
  @IsNotEmpty()
  @Length(2, 100)
  nombre: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  @Length(2, 100)
  raza: string;

  @Field(() => Int)
  @Type(() => Number)
  @IsInt()
  @Min(0)
  @Max(60)
  edad: number;

  @Field(() => Float)
  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  peso: number;

  @Field(() => Int)
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  medicamentoId: number;

  @Field()
  @IsString()
  @IsNotEmpty()
  @Length(6, 20)
  clienteId: string;
}
