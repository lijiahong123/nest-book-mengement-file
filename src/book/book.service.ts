import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { DBService } from '../db/db.service';
import { CreateBookDto } from './dto/cerate-book.dto';
import { Book } from './entities/book.entity';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BookService {
  @Inject(DBService)
  dbService: DBService;

  async queryPage() {
    const books = await this.dbService.read();
    return books;
  }

  async findOne(id: number) {
    const books = await this.dbService.read();
    const book = books.find((item) => item.id === id);
    if (!book) throw new Error('Book not found');
    return book;
  }

  async createBook(createBookDto: CreateBookDto) {
    const books: Book[] = await this.dbService.read();
    const book = books.find((item) => item.name === createBookDto.name);
    if (book) throw new BadRequestException('图书已存在');

    const newBook: Book = new Book();
    newBook.id = books.length + 1;
    newBook.name = createBookDto.name;
    newBook.author = createBookDto.author;
    newBook.description = createBookDto.description;
    newBook.cover = createBookDto.cover;
    await this.dbService.write([newBook, ...books]);
    return newBook;
  }

  async updateBook(updateBookDto: UpdateBookDto) {
    const books: Book[] = await this.dbService.read();
    const index = books.findIndex((item) => item.id === updateBookDto.id);
    if (index === -1) throw new BadRequestException('图书不存在');

    books.splice(index, 1, updateBookDto);
    await this.dbService.write(books);
    return index;
  }

  async deleteId(id: number) {
    const books: Book[] = await this.dbService.read();
    const index = books.findIndex((item) => item.id === id);
    if (index === -1) throw new BadRequestException('图书不存在');

    books.splice(index, 1);
    await this.dbService.write(books);
    return true;
  }
}
