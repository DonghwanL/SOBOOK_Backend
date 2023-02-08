import { BadRequestException, PipeTransform } from '@nestjs/common';
import { BookStatus } from '../book-shelf.model';

export class BookStatusValidationPipe implements PipeTransform {
  readonly StatusOptions = [BookStatus.READING, BookStatus.COMPLETE];

  transform(value: any) {
    value = value.toUpperCase();

    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`${value}는 Status로 설정할 수 없는 값 입니다.`);
    }

    return value;
  }

  private isStatusValid(status: any) {
    return this.StatusOptions.includes(status);
  }
}
