import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './../auth/guards/statery/jwt.statery';
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  imports: [JwtModule.register({}), PassportModule],
  providers: [UserService, JwtStrategy],
  controllers: [UserController],
})
export class UserModule {}
