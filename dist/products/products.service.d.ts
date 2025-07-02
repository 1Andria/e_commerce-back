import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { User } from 'src/users/schema/user.schema';
import mongoose, { Model } from 'mongoose';
import { Product } from './schema/product.schema';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
export declare class ProductsService {
    private readonly cloudinaryService;
    private readonly productModel;
    private readonly userModel;
    constructor(cloudinaryService: CloudinaryService, productModel: Model<Product>, userModel: Model<User>);
    create({ category, description, features, inTheBox, price, title, }: CreateProductDto, userId: string, images: Express.Multer.File[]): Promise<{
        success: string;
        data: mongoose.Document<unknown, {}, Product, {}> & Product & {
            _id: mongoose.Types.ObjectId;
        } & {
            __v: number;
        };
    }>;
    findAll(category?: string): Promise<(mongoose.Document<unknown, {}, Product, {}> & Product & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    findOne(id: string): Promise<mongoose.Document<unknown, {}, Product, {}> & Product & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    update(id: number, { category, description, features, inTheBox, price, title, }: UpdateProductDto): string;
    remove(id: string, userId: string): Promise<{
        message: string;
        deletedProductId: (mongoose.Document<unknown, {}, Product, {}> & Product & {
            _id: mongoose.Types.ObjectId;
        } & {
            __v: number;
        }) | null;
    }>;
    selectProduct(userId: string, productId: string, quantity?: number): Promise<{
        message: string;
        selectedProducts: {
            product: mongoose.Types.ObjectId;
            quantity: number;
        }[];
    }>;
}
