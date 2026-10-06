import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vendor } from './entities/vendor.entity.js';
import { VendorsService } from './vendors.service.js';
import { VendorsController } from './vendors.controller.js';

@Module({
    imports :[TypeOrmModule.forFeature([Vendor])],
    providers: [VendorsService],
    controllers: [VendorsController],
})
export class VendorsModule {}
