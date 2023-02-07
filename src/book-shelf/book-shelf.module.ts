import { Module } from '@nestjs/common';
import { BookShelfController } from './book-shelf.controller';
import { BookShelfService } from './book-shelf.service';

@Module({
  controllers: [BookShelfController],
  providers: [BookShelfService],
})
export class BookShelfModule {}
