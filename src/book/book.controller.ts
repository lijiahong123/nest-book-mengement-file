import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/cerate-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { storage } from './my-file-storage';
import * as path from 'path';

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

  @Post('uoloadFile')
  @UseInterceptors(
    FileInterceptor('file', {
      dest: 'upload',
      storage: storage,
      limits: {
        fileSize: 3 * 1024 * 1024, // 3MB
      },
      fileFilter(req, file, callback) {
        const extname = path.extname(file.originalname);
        if (!['.png', '.jpg', '.jpeg', '.gif'].includes(extname)) {
          callback(
            new BadRequestException('仅支持.png, .jpg, .jpeg, .gif 后缀图片'),
            false,
          );
        }
        callback(null, true);
      },
    }),
  )
  upload(@UploadedFile() file: Express.Multer.File) {
    console.log('file', file);

    return '/' + file.path.replace('\\', '/');
  }
}
