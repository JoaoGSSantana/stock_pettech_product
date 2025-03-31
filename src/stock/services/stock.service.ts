import { Injectable, NotFoundException } from '@nestjs/common';

import { ProductRepository } from '../repositories/product.repository';
import { IProduct } from '../schemas/models/product.interface';

@Injectable()
export class StockService {
  constructor(private readonly productRepository: ProductRepository) {}

  async getAllStock(limit: number, page: number): Promise<IProduct[]> {
    return this.productRepository.getAllStock(limit, page);
  }

  async getStockById(productId: string): Promise<IProduct | null> {
    const product = await this.productRepository.getStockById(productId);

    if (!product) throw new NotFoundException(`Product not found.`);

    return product;
  }

  async createStock(product: IProduct): Promise<void> {
    await this.productRepository.createStock(product);
  }

  async updateStock(productId: string, stock: number): Promise<void> {
    await this.productRepository.updateStock(productId, stock);
  }

  async deleteStock(productId: string): Promise<void> {
    await this.productRepository.deleteStock(productId);
  }
}
