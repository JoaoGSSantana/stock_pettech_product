import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StockModule } from './stock/stock.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/pettech'), StockModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
