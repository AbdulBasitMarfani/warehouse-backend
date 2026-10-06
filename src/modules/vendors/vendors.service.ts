import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Vendor } from './entities/vendor.entity.js';
import { Repository } from 'typeorm';
import { CreateVendorDto } from './dto/createVendor.dto.js';
import { UpdateVendorDTO } from './dto/updayeVendor.dto.js';

@Injectable()
export class VendorsService {
  constructor(
    @InjectRepository(Vendor)
    private vendorRepository: Repository<Vendor>,
  ) {}

  async createVendor(createVendorDto: CreateVendorDto): Promise<Vendor> {
    const isVendorExists = await this.vendorRepository.findOneBy({
      name: createVendorDto.name,
    });
    if (isVendorExists) {
      throw new BadRequestException('Vendor with this name already exists');
    }
    const vendor = this.vendorRepository.create(createVendorDto);
    return this.vendorRepository.save(vendor);
  }

  async updateVendor(
    id: string,
    updateVendorDto: UpdateVendorDTO,
  ): Promise<Vendor> {
    const vendor = await this.vendorRepository.findOneBy({ id: Number(id) });
    if (!vendor) {
      throw new NotFoundException('Vendor not found');
    }
    Object.assign(vendor, updateVendorDto);
    return this.vendorRepository.save(vendor);
  }

  async getAllVendors(): Promise<Vendor[]> {
    return this.vendorRepository.find({
      order: { createdAt: 'ASC' },
      select: {
        id: true,
        name: true,
        phone: true,
        email: true,
        address: true,
        isActive: true,
      },
    });
  }

  async getById(id: string): Promise<Vendor> {
    const vendor = await this.vendorRepository.findOneBy({ id: Number(id) });
    if (!vendor) {
      throw new NotFoundException('Vendor not found');
    }
    return vendor;
  }
}
