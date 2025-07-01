import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types } from 'mongoose';

export type ProductDocument = HydratedDocument<Product>;

@Schema({ timestamps: true })
export class Product {
  @Prop({
    type: String,
    required: true,
  })
  category: string;

  @Prop({
    type: String,
    required: true,
  })
  title: string;

  @Prop({
    type: Number,
    required: true,
  })
  price: number;

  @Prop({
    type: String,
    required: true,
  })
  description: string;

  @Prop({
    type: String,
    required: true,
  })
  features: string;

  @Prop({
    type: String,
    required: true,
  })
  src: string;

  @Prop()
  srcPublicId: string;

  @Prop({ type: [String], default: [] })
  additionalImages: string[];

  @Prop({ type: [String], default: [] })
  additionalPublicIds: string[];

  @Prop({
    type: [
      {
        item: { type: String, required: true },
        quantity: { type: Number, required: true },
      },
    ],
    default: [],
  })
  inTheBox: { item: string; quantity: number }[];

  @Prop({ type: mongoose.Types.ObjectId, ref: 'User', required: true })
  ProductOwner: mongoose.Types.ObjectId;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
