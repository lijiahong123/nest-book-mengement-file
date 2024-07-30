import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { RegistryUserDto } from './dto/registry-user.dto';
import { DBService } from 'src/db/db.service';
import { User } from './entities/user.entity';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class UserService {
  @Inject(DBService)
  dbService: DBService;

  async registry(registryUserDto: RegistryUserDto) {
    const users: User[] = await this.dbService.read();
    console.log(users);
    const user = users.find(
      (item) => item.usename === registryUserDto.username,
    );
    if (user) throw new BadRequestException('该用户已注册');

    const userInfo = new User();
    userInfo.usename = registryUserDto.username;
    userInfo.password = registryUserDto.password;

    users.push(userInfo);
    await this.dbService.write(users);
    return userInfo;
  }

  async login(loginUserDto: LoginUserDto) {
    const users: User[] = await this.dbService.read();
    const user = users.find(
      (item) =>
        item.usename === loginUserDto.username &&
        item.password === loginUserDto.password,
    );
    if (!user) throw new BadRequestException('用户名或密码错误');
    return loginUserDto;
  }
}
