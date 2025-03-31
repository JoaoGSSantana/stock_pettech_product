import { ZodValidationPipe } from 'src/shared/pipe/zod-validation.pipe';
import { z } from 'zod';

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
} from '@nestjs/common';

import { StockService } from '../services/stock.service';

const createStockSchema = z.object({
  name: z.string(),
  quantity: z.coerce.number(),
  relationId: z.string(),
});

const updateStockSchema = z.object({
  stock: z.coerce.number(),
});

type CreateStock = z.infer<typeof createStockSchema>;

type UpdateStock = z.infer<typeof updateStockSchema>;

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

  @UsePipes(new ZodValidationPipe(createStockSchema))
  @Post()
  async createStock(@Body() product: CreateStock) {
    await this.stockService.createStock(product);
  }

  @Put(':productId')
  async updateStock(
    @Param('productId') productId: string,
    @Body(new ZodValidationPipe(updateStockSchema)) { stock }: UpdateStock,
  ) {
    await this.stockService.updateStock(productId, stock);
  }

  @Delete(':productId')
  async deleteStock(@Param('productId') productId: string) {
    await this.stockService.deleteStock(productId);
  }
}
