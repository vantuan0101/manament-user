import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AuthDto, AuthLoginDto } from './dto/Auth.dto';
import { PrismaService } from './../prisma/prisma.service';
import { ForbiddenException, Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(
    private jwt: JwtService,
    private prisma: PrismaService,
    private config: ConfigService,
  ) {}
  async register(data: AuthDto) {
    // console.log(data);
    try {
      const user = await this.prisma.user.create({
        data: {
          fullName: data.fullName,
          password: data.password,
          username: data.username,
          avatar: data.avatar,
          role: data.role,
        },
      });
      return {
        message: 'Register success',
        status: 'success',
        errCode: 0,
        data: user,
      };
    } catch (error) {
      throw new Error(error);
    }
  }
  async login(data: AuthLoginDto) {
    // console.log(data);
    try {
      const user = await this.prisma.user.findFirst({
        where: {
          username: data.username,
        },
      });
      if (!user) {
        throw new Error('User not found');
      }
      const token = await this.signToken(user?.id, user?.username);
      if (user?.password === data?.password) {
        delete user.password;
        return {
          message: 'Login success',
          status: 'success',
          errCode: 0,
          data: user,
          accesesToken: token,
        };
      }
      return {
        message: 'Login fail',
        status: 'fail',
      };
    } catch (error) {
      throw new Error(error);
    }
  }

  //   token
  async signToken(id: number, username: string): Promise<string> {
    const payload = {
      id,
      username,
    };
    const secret = this.config.get('JWT_SECRET');

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '1d',
      secret: secret,
    });

    return token;
  }
}
