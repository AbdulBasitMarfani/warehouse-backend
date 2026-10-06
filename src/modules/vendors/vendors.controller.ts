import { Body, Controller, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { VendorsService } from './vendors.service.js';
import { CreateVendorDto } from './dto/createVendor.dto.js';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from '../auth/custom.decorator/role.decorator.js';
import { UserRole } from '../users/entities/user-role.js';
import { UpdateVendorDTO } from './dto/updayeVendor.dto.js';

@Controller('vendors')
@ApiBearerAuth()
@ApiTags('vendors')
export class VendorsController {

    constructor(private readonly vendorsService: VendorsService) {}

    @Post()
    @Roles([UserRole.Owner])
    // @ApiBody({ type: CreateVendorDto })
    @ApiResponse({ status: 201, description: 'Vendor created successfully' })
    @ApiResponse({ status: 400, description: 'Invalid request body' })
    async createVendor(@Body() createVendorDto: CreateVendorDto) {
        return this.vendorsService.createVendor(createVendorDto);
    }

    @Put(':id')
    @Roles([UserRole.Owner])
    @ApiResponse({ status: 200, description: 'Vendor updated successfully' })
    @ApiResponse({ status: 400, description: 'Invalid request body' })
    @ApiResponse({ status: 404, description: 'Vendor not found' })
    async updateVendor(@Param('id', ParseIntPipe) id: number, @Body() updateVendorDto: UpdateVendorDTO) {
        return this.vendorsService.updateVendor(id.toString(), updateVendorDto);
    }

    @Get()
    @Roles([UserRole.Owner])
    @ApiResponse({ status: 200, description: 'Vendors fetched successfully' })
    async getAllVendors() {
        return this.vendorsService.getAllVendors();
    }

    @Get(':id')
    @Roles([UserRole.Owner])
    @ApiResponse({ status: 200, description: 'Vendor fetched successfully' })
    @ApiResponse({ status: 404, description: 'Vendor not found' })
    async getVendorById(@Param('id') id: string) {
        return this.vendorsService.getById(id.toString());
    }
}
