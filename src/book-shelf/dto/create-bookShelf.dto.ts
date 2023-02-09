import { IsInt, IsNotEmpty, IsOptional, IsString, Max, Min } from 'class-validator';

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

  @IsInt()
  @Min(0)
  @Max(5)
  @IsOptional()
  readonly rating?: number;
}
