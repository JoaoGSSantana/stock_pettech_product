import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';

import { IProduct } from '../schemas/models/product.interface';
import { StockService } from '../services/stock.service';

@Controller('stock')
export class StockController {
  constructor(private readonly stockService: StockService) {}

  @Get()
  async getAllStock(
    @Query('limit') limit: number,
    @Query('page') page: number,
  ) {
    return this.stockService.getAllStock(limit, page);
  }

  @Get(':productId')
  async getStock(@Param('productId') productId: string) {
    return this.stockService.getStockById(productId);
  }

  @Post()
  async createStock(@Body() product: IProduct) {
    await this.stockService.createStock(product);
  }

  @Put(':productId')
  async updateStock(
    @Param('productId') productId: string,
    @Body('stock') stock: number,
  ) {
    await this.stockService.updateStock(productId, stock);
  }

  @Delete(':productId')
  async deleteStock(@Param('productId') productId: string) {
    await this.stockService.deleteStock(productId);
  }
}
