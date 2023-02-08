import { Module } from '@nestjs/common';
import { TypeOrmExModule } from './typeorm-ex.module';
import { BookShelfController } from './book-shelf.controller';
import { BookShelfService } from './book-shelf.service';
import { BookShelfRepository } from './book-shelf.repository';

@Module({
  imports: [TypeOrmExModule.forCustomRepository([BookShelfRepository])],
  controllers: [BookShelfController],
  providers: [BookShelfService],
})
export class BookShelfModule {}
