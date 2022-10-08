import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UserDto {
  @IsNotEmpty()
  @IsString()
  password: string;
  @IsNotEmpty()
  @IsString()
  fullName: string;
  @IsNotEmpty()
  @IsString()
  avatar: string;
  @IsNotEmpty()
  @IsString()
  username: string;
  @IsNotEmpty()
  @IsString()
  role: string;
}
export interface UpdateMe {
  fullName?: string;
  avatar?: string;
  username?: string;
}
