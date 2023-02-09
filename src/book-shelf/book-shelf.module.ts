import { Module } from '@nestjs/common';
import { TypeOrmExModule } from '../common/typeorm-ex.module';
import { BookShelfController } from './book-shelf.controller';
import { BookShelfService } from './book-shelf.service';
import { BookShelfRepository } from './repository/book-shelf.repository';

@Module({
  imports: [TypeOrmExModule.forCustomRepository([BookShelfRepository])],
  controllers: [BookShelfController],
  providers: [BookShelfService],
})
export class BookShelfModule {}
