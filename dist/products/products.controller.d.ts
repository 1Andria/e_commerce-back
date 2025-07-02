import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
export declare class ProductsController {
    private cloudinaryService;
    private readonly productsService;
    constructor(cloudinaryService: CloudinaryService, productsService: ProductsService);
    create(images: Express.Multer.File[], userId: any, createProductDto: CreateProductDto): Promise<{
        success: string;
        data: import("mongoose").Document<unknown, {}, import("./schema/product.schema").Product, {}> & import("./schema/product.schema").Product & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        };
    }>;
    findAll(category?: string): Promise<(import("mongoose").Document<unknown, {}, import("./schema/product.schema").Product, {}> & import("./schema/product.schema").Product & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, {}, import("./schema/product.schema").Product, {}> & import("./schema/product.schema").Product & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    update(id: string, updateProductDto: UpdateProductDto): string;
    remove(userId: any, id: string): Promise<{
        message: string;
        deletedProductId: (import("mongoose").Document<unknown, {}, import("./schema/product.schema").Product, {}> & import("./schema/product.schema").Product & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }) | null;
    }>;
    selectProduct(userId: string, productId: string, quantity?: number): Promise<{
        message: string;
        selectedProducts: {
            product: import("mongoose").Types.ObjectId;
            quantity: number;
        }[];
    }>;
}
