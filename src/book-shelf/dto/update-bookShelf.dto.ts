import { PartialType } from '@nestjs/mapped-types';
import { IsOptional } from 'class-validator';
import { BookStatus } from '../book-status.enum';
import { CreateBookShelfDTO } from './create-bookShelf.dto';

export class UpdateBookShelfDTO extends PartialType(CreateBookShelfDTO) {
  @IsOptional()
  readonly status?: BookStatus;
}
