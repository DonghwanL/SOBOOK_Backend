import { IsNumber, IsOptional, IsString } from 'class-validator';

export class SearchBooksDTO {
  @IsString()
  @IsOptional()
  readonly query: string;

  @IsString()
  @IsOptional()
  readonly sort: string;

  @IsNumber()
  @IsOptional()
  readonly start: number;

  @IsNumber()
  @IsOptional()
  readonly display: number;

  @IsString()
  @IsOptional()
  readonly d_isbn: string;
}
