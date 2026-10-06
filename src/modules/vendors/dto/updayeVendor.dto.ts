import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPhoneNumber, IsString, MaxLength, MinLength } from 'class-validator';

export class UpdateVendorDTO {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(255)
  @ApiProperty({
    description: 'The name of the vendor',
    example: 'John Doe',
    required: true,
  })
  name: string;

  @IsString()
  @MaxLength(255)
  @ApiProperty({
    description: 'The contact name of the vendor',
    example: 'John Doe',
  })
  contactName: string;

  @IsString()
  @MaxLength(255)
  @IsPhoneNumber('PK')
  @ApiProperty({
    description: 'The phone number of the vendor',
    example: '+923001234567',
  })
  phone: string;

  @IsString()
  @MaxLength(255)
  @ApiProperty({
    description: 'The email of the vendor',
    example: 'john.doe@example.com',
  })
  email: string;

  @IsString()
  @MaxLength(255)
  @ApiProperty({
    description: 'The address of the vendor',
    example: '123 Main St, Anytown, USA',
  })
  address: string;
}
