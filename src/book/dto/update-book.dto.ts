import { IsInt, IsNotEmpty } from 'class-validator';

export class UpdateBookDto {
  @IsNotEmpty({ message: 'id必传' })
  @IsInt({ message: 'ID错误' })
  id: number;

  @IsNotEmpty({ message: '书名不能为空' })
  //   @Length(1, 20, { message: '书名长度不得超过20字符' })
  name: string;

  @IsNotEmpty({ message: '作者不得为空' })
  author: string;

  @IsNotEmpty({ message: '描述不得为空' })
  description: string;

  @IsNotEmpty({ message: '封面图不得为空' })
  cover: string;
}
