import { ConfigService } from '@nestjs/config';
import { UpdateMe, UserDto } from './dto/UserDto';
import { PrismaService } from './../prisma/prisma.service';
import { Injectable, ForbiddenException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    private jwt: JwtService,
    private prisma: PrismaService,
    private config: ConfigService,
  ) {}
  async getMe(id: number) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          id: id,
        },
      });
      delete user?.password;
      return {
        status: 200,
        message: 'Get user success',
        data: user,
      };
    } catch (error) {
      throw new Error(error);
    }
  }
  async updateMe(id: number, data: UpdateMe) {
    try {
      const user = await this.getMe(id);
      if (!user) {
        throw new Error('User not found');
      }
      const update = await this.prisma.user.update({
        where: {
          id: id,
        },
        data: {
          ...data,
        },
      });
      return {
        status: 200,
        message: 'Update user success',
        data: update,
      };
    } catch (error) {
      throw new Error(error);
    }
  }
  //   Only Admin can access
  async getAllUser() {
    try {
      const user = await this.prisma.user.findMany();
      return {
        status: 200,
        message: 'Get all user success',
        data: user,
      };
    } catch (error) {
      throw new Error(error);
    }
  }
  async createUser(data: UserDto) {
    try {
      const user = await this.prisma.user.create({
        data: {
          ...data,
        },
      });
      return {
        status: 200,
        message: 'Update user success',
        data: user,
      };
    } catch (error) {
      throw new Error(error);
    }
  }
  async updateUser(id: number, data: UpdateMe) {
    try {
      const user = await this.prisma.user.update({
        where: {
          id: id,
        },
        data: {
          ...data,
        },
      });
      return {
        status: 200,
        message: 'Update user success',
        data: user,
      };
    } catch (error) {
      throw new Error(error);
    }
  }
  async deleteUser(id: number) {
    try {
      await this.prisma.user.delete({
        where: {
          id: id,
        },
      });
      return {
        status: 200,
        message: 'Delete user success',
      };
    } catch (error) {
      throw new Error(error);
    }
  }
}
