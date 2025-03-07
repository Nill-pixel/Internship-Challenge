import { IsBoolean, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';

export class CreateTaskDto {
  @IsNotEmpty({ message: 'O título é obrigatório' })
  @IsString({ message: 'O título deve ser uma string' })
  @MinLength(3, { message: 'O título deve ter pelo menos 3 caracteres' })
  @MaxLength(100, { message: 'O título deve ter no máximo 100 caracteres' })
  title!: string;

  @IsOptional()
  @IsString({ message: 'A descrição deve ser uma string' })
  @MaxLength(500, { message: 'A descrição deve ter no máximo 500 caracteres' })
  description?: string;
}

export class UpdateTaskDto {
  @IsOptional()
  @IsString({ message: 'O título deve ser uma string' })
  @MinLength(3, { message: 'O título deve ter pelo menos 3 caracteres' })
  @MaxLength(100, { message: 'O título deve ter no máximo 100 caracteres' })
  title?: string;

  @IsOptional()
  @IsString({ message: 'A descrição deve ser uma string' })
  @MaxLength(500, { message: 'A descrição deve ter no máximo 500 caracteres' })
  description?: string;

}

export class TaskResponseDto {
  @Expose()
  id!: string;

  @Expose()
  title!: string;

  @Expose()
  description!: string;

  @Expose()
  completed!: boolean;

  @Expose()
  createdAt!: Date;

  @Expose()
  updatedAt!: Date;

  @Expose()
  files!: TaskFileDto[];
}

export class TaskFileDto {
  @Expose()
  id!: string;

  @Expose()
  filename!: string;

  @Expose()
  originalname!: string;

  @Expose()
  mimetype!: string;

  @Expose()
  size!: number;

  @Expose()
  createdAt!: Date;

  @Exclude()
  path!: string;
}