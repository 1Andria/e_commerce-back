import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema({ timestamps: true })
export class User {
  @Prop({ type: String, required: true, unique: true, lowercase: true })
  email: string;

  @Prop({
    type: String,
    required: true,
    select: false,
  })
  password: string;
  @Prop({
    type: String,
    enum: ['admin', 'viewer'],
    default: 'viewer',
  })
  role: string;

  @Prop({
    type: [mongoose.Types.ObjectId],
    default: [],
    ref: 'product',
  })
  products: mongoose.Types.ObjectId[];

  @Prop({
    type: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'product' },
        quantity: { type: Number, default: 1 },
      },
    ],
    default: [],
  })
  selectedProducts: {
    product: mongoose.Types.ObjectId;
    quantity: number;
  }[];
}

export const userSchema = SchemaFactory.createForClass(User);
