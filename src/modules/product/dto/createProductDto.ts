import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateProductDto {
    @ApiProperty({ description: 'The name of the product' })
    @IsString()
    @IsNotEmpty()
    name: string;
    @ApiProperty({ description: 'The brand of the product' })
    @IsString()
    brand: string;
    @ApiProperty({ description: 'The part number of the product' })
    @IsString()
    @IsNotEmpty()
    partNumber: string;
    @ApiProperty({ description: 'The purchase price of the product' })
    @IsNumber()
    @IsNotEmpty()
    purchasePrice: number;
    @ApiProperty({ description: 'The selling price of the product' })
    @IsNumber()
    @IsNotEmpty()   
    sellingPrice: number;
    @ApiProperty({ description: 'The vendor id of the product' })
    @IsNumber()
    @IsNotEmpty()
    vendorId: number;
}