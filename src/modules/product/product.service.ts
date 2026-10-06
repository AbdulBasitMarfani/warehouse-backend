import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './entities/product.entity.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/createProductDto.js';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    const product = this.productRepository.create(createProductDto);
    return this.productRepository.save(product);
  }

  async findAllProducts(): Promise<Product[]> {
    return this.productRepository.find();
  }

  async findProductById(id: number): Promise<Product> {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }

//   async updateProduct(id: number, updateProductDto: UpdateProductDto): Promise<Product> {
//     return this.productRepository.update(id, updateProductDto);
//   }

//   async deleteProduct(id: number): Promise<void> {
//     await this.productRepository.delete(id);
//   }
}
