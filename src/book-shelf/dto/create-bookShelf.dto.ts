import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateBookShelfDto {
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @IsString()
  @IsNotEmpty()
  readonly author: string;

  @IsString()
  @IsNotEmpty()
  readonly publisher: string;

  @IsString()
  @IsNotEmpty()
  readonly pubdate: string;

  @IsOptional()
  readonly image?: string;

  @IsOptional()
  readonly memo?: string;

  @IsNumber()
  @IsOptional()
  readonly rating?: number;
}
