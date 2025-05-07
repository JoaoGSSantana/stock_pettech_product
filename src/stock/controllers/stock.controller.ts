import { AuthGuard } from 'src/shared/guards/auth.guard';
import { LoggingInterceptor } from 'src/shared/interceptors/logging.interceptor';
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
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

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

@ApiTags('Stock')
@UseInterceptors(LoggingInterceptor)
@Controller('stock')
export class StockController {
  constructor(private readonly stockService: StockService) {}

  @UseGuards(AuthGuard)
  @Get()
  @ApiOperation({
    summary: 'Listar todos os produtos em estoque com paginação',
  })
  async getAllStock(
    @Query('limit') limit: number,
    @Query('page') page: number,
  ) {
    return this.stockService.getAllStock(limit, page);
  }

  @Get(':productId')
  @ApiOperation({
    summary: 'Obter os dados de estoque de um produto específico',
  })
  async getStock(@Param('productId') productId: string) {
    return this.stockService.getStockById(productId);
  }

  @UsePipes(new ZodValidationPipe(createStockSchema))
  @Post()
  @ApiOperation({
    summary: 'Criar um novo registro de estoque para um produto',
  })
  async createStock(@Body() product: CreateStock) {
    await this.stockService.createStock(product);
  }

  @Put(':productId')
  @ApiOperation({ summary: 'Atualizar a quantidade de estoque de um produto' })
  async updateStock(
    @Param('productId') productId: string,
    @Body(new ZodValidationPipe(updateStockSchema)) { stock }: UpdateStock,
  ) {
    await this.stockService.updateStock(productId, stock);
  }

  @Delete(':productId')
  @ApiOperation({ summary: 'Remover o registro de estoque de um produto' })
  async deleteStock(@Param('productId') productId: string) {
    await this.stockService.deleteStock(productId);
  }
}
