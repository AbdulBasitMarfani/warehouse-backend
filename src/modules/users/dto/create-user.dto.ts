import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString, MinLength } from 'class-validator';
import { UserRole } from '../entities/user-role.js';

export class CreateUserDto {
  @ApiProperty({ example: 'store1', minLength: 3 })
  @IsString()
  @MinLength(3)
  username: string;

  @ApiProperty({ example: 'password123', minLength: 8 })
  @IsString()
  @MinLength(8)
  password: string;

  @ApiProperty({ enum: UserRole, example: UserRole.Storekeeper })
  @IsEnum(UserRole)
  role: UserRole;
}
