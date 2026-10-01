import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';

export class UpdateUserActiveDto {
  @ApiProperty({ example: false })
  @IsBoolean()
  isActive: boolean;
}
