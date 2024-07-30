import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/cerate-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get('list')
  list() {
    return this.bookService.queryPage();
  }
  @Get(':id')
  queryOne(@Param('id', ParseIntPipe) id: number) {
    return this.bookService.findOne(id);
  }

  @Post('add')
  create(@Body() createBookDto: CreateBookDto) {
    return this.bookService.createBook(createBookDto);
  }

  @Post('update')
  update(@Body() updateBookDto: UpdateBookDto) {
    return this.bookService.updateBook(updateBookDto);
  }

  @Post('delete/:id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.bookService.deleteId(id);
  }
}
