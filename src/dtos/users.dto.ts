import { IsEmail, IsString, IsEnum } from 'class-validator';

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

export class InviteUserDto {
  @IsString()
  name: string;

  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @IsEnum(UserRole, { message: 'Role must be either "admin" or "user"' })
  role: UserRole;
}
