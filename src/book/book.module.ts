import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { DbModule } from 'src/db/db.module';

@Module({
  controllers: [BookController],
  providers: [BookService],
  imports: [
    DbModule.registry({
      path: 'books.json',
    }),
  ],
})
export class BookModule {}
