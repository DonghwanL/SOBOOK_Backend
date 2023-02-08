import { PartialType } from '@nestjs/mapped-types';
import { IsOptional } from 'class-validator';
import { BookStatus } from '../book-status.enum';
import { CreateBookShelfDto } from './create-bookShelf.dto';

export class UpdateBookShelfDto extends PartialType(CreateBookShelfDto) {
  @IsOptional()
  readonly status?: BookStatus;
}
