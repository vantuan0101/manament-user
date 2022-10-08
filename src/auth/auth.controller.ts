import { RoleType } from 'src/shared/enum/roles.enum';
import { AuthLoginDto, AuthDto } from './dto/Auth.dto';
import { AuthService } from './auth.service';
import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { Roles } from './guards/roles.decorator';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('register')
  register(@Body() data: AuthDto) {
    return this.authService.register(data);
  }
  @Post('login')
  login(@Body() data: AuthLoginDto) {
    return this.authService.login(data);
  }
}
