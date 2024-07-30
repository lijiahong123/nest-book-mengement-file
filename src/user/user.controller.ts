import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { RegistryUserDto } from './dto/registry-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('registry')
  registry(@Body() registryUserDto: RegistryUserDto) {
    return this.userService.registry(registryUserDto);
  }

  @Post('login')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.userService.login(loginUserDto);
  }
}
