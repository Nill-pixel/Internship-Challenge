import { Expose } from 'class-transformer';

export class FileDto {
  @Expose()
  id!: number;

  @Expose()
  filename!: string;

  @Expose()
  path!: string;
}