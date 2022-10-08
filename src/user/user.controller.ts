import { JwtGuard } from './../auth/guards/jwt.guard';
import { RolesGuard } from './../auth/guards/roles.guard';
import { UpdateMe, UserDto } from './dto/UserDto';
import { UserService } from './user.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Roles } from 'src/auth/guards/roles.decorator';
import { RoleType } from 'src/shared/enum/roles.enum';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Get('me')
  GetMe(@Body() id: string) {
    return this.userService.getMe(+id);
  }
  @Patch('me/:id')
  UpdateMe(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateMe) {
    return this.userService.updateMe(+id, data);
  }

  //   Only Admin Can Access
  @Get()
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(RoleType.Admin)
  GetAll() {
    return this.userService.getAllUser();
  }
  @Post()
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(RoleType.Admin)
  CreateUser(@Body() data: UserDto) {
    return this.userService.createUser(data);
  }
  @Patch('/:id')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(RoleType.Admin)
  UpdateUser(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateMe) {
    return this.userService.updateUser(id, data);
  }
  @Delete('/:id')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(RoleType.Admin)
  DeleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.deleteUser(id);
  }
}
