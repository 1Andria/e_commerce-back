import mongoose, { HydratedDocument, Types } from 'mongoose';
export type ProductDocument = HydratedDocument<Product>;
export declare class Product {
    category: string;
    title: string;
    price: number;
    description: string;
    features: string;
    src: string;
    srcPublicId: string;
    additionalImages: string[];
    additionalPublicIds: string[];
    inTheBox: {
        item: string;
        quantity: number;
    }[];
    ProductOwner: mongoose.Types.ObjectId;
}
export declare const ProductSchema: mongoose.Schema<Product, mongoose.Model<Product, any, any, any, mongoose.Document<unknown, any, Product, any> & Product & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Product, mongoose.Document<unknown, {}, mongoose.FlatRecord<Product>, {}> & mongoose.FlatRecord<Product> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
