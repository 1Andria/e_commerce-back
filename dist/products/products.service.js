"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const cloudinary_service_1 = require("../cloudinary/cloudinary.service");
let ProductsService = class ProductsService {
    cloudinaryService;
    productModel;
    userModel;
    constructor(cloudinaryService, productModel, userModel) {
        this.cloudinaryService = cloudinaryService;
        this.productModel = productModel;
        this.userModel = userModel;
    }
    async create({ category, description, features, inTheBox, price, title, }, userId, images) {
        if (!images || images.length !== 4) {
            throw new common_1.BadRequestException('Exactly 4 images are required');
        }
        const existUser = await this.userModel.findById(userId);
        if (!existUser || existUser.role !== 'admin') {
            throw new common_1.BadRequestException('User not found or is not an admin');
        }
        const uploaded = await Promise.all(images.map((file) => this.cloudinaryService.uploadImage(file)));
        const defaultBoxItems = [
            { item: 'Charging Cable', quantity: 1 },
            { item: 'User Manual', quantity: 1 },
            { item: 'Cleaning Kit', quantity: 1 },
        ];
        const finalInTheBox = inTheBox && inTheBox.length > 0 ? inTheBox : defaultBoxItems;
        const mainImage = {
            url: uploaded[0].secure_url,
            publicId: uploaded[0].public_id,
        };
        const additional = uploaded.slice(1).map((img) => ({
            url: img.secure_url,
            publicId: img.public_id,
        }));
        const newProduct = await this.productModel.create({
            category,
            description,
            features,
            inTheBox: finalInTheBox,
            price,
            title,
            src: mainImage.url,
            srcPublicId: mainImage.publicId,
            additionalImages: additional.map((img) => img.url),
            additionalPublicIds: additional.map((img) => img.publicId),
            ProductOwner: userId,
        });
        await this.userModel.findByIdAndUpdate(existUser._id, {
            $push: { products: newProduct._id },
        });
        return { success: 'ok', data: newProduct };
    }
    async findAll(category) {
        const filter = category ? { category } : {};
        const products = await this.productModel.find(filter);
        return products;
    }
    async findOne(id) {
        if (!(0, mongoose_1.isValidObjectId)(id)) {
            throw new common_1.BadRequestException('Invalid ID');
        }
        const product = await this.productModel.findById(id);
        if (!product) {
            throw new common_1.NotFoundException('Product not found');
        }
        return product;
    }
    update(id, { category, description, features, inTheBox, price, title, }) {
        return `This action updates a #${id} product`;
    }
    async remove(id, userId) {
        if (!(0, mongoose_1.isValidObjectId)(id)) {
            throw new common_1.BadRequestException('Invalid ID');
        }
        const existUser = await this.userModel.findById(userId);
        if (!existUser || existUser.role !== 'admin') {
            throw new common_1.BadRequestException('User not found or is not an admin');
        }
        const product = await this.productModel.findById(id);
        if (!product) {
            throw new common_1.NotFoundException('Product not found');
        }
        if (product.srcPublicId) {
            await this.cloudinaryService.deleteImage(product.srcPublicId);
        }
        if (product.additionalPublicIds?.length) {
            for (const publicId of product.additionalPublicIds) {
                await this.cloudinaryService.deleteImage(publicId);
            }
        }
        await this.userModel.findByIdAndUpdate(product.ProductOwner, {
            $pull: { products: product._id },
        });
        const deletedProduct = await this.productModel.findByIdAndDelete(id);
        return {
            message: 'Product deleted successfully',
            deletedProductId: deletedProduct,
        };
    }
    async selectProduct(userId, productId, quantity = 1) {
        if (!(0, mongoose_1.isValidObjectId)(productId)) {
            throw new common_1.BadRequestException('Product not found');
        }
        const product = await this.productModel.findById(productId);
        if (!product) {
            throw new common_1.BadRequestException('Product not found');
        }
        const existUser = await this.userModel.findById(userId);
        if (!existUser) {
            throw new common_1.BadRequestException('User not found');
        }
        const objectId = new mongoose_1.default.Types.ObjectId(productId);
        const existingIndex = existUser.selectedProducts.findIndex((p) => p.product.toString() === productId);
        if (existingIndex !== -1) {
            existUser.selectedProducts[existingIndex].quantity += quantity;
        }
        else {
            existUser.selectedProducts.push({
                product: objectId,
                quantity,
            });
        }
        await existUser.save();
        return {
            message: 'Product selected successfully',
            selectedProducts: existUser.selectedProducts,
        };
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, mongoose_2.InjectModel)('product')),
    __param(2, (0, mongoose_2.InjectModel)('user')),
    __metadata("design:paramtypes", [cloudinary_service_1.CloudinaryService,
        mongoose_1.Model,
        mongoose_1.Model])
], ProductsService);
//# sourceMappingURL=products.service.js.map