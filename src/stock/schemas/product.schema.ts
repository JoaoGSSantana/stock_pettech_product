import mongoose, { HydratedDocument } from 'mongoose';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { IProduct } from './models/product.interface';

export type ProductDocument = HydratedDocument<Product>;

@Schema()
export class Product implements IProduct {
  @Prop({ type: mongoose.Schema.Types.ObjectId })
  id?: string | undefined;

  @Prop()
  name: string;

  @Prop()
  quantity?: number;

  @Prop()
  relationId: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
