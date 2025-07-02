import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { User } from 'src/users/schema/user.schema';
import mongoose, { isValidObjectId, Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './schema/product.schema';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class ProductsService {
  constructor(
    private readonly cloudinaryService: CloudinaryService,
    @InjectModel('product') private readonly productModel: Model<Product>,
    @InjectModel('user') private readonly userModel: Model<User>,
  ) {}
  async create(
    {
      category,
      description,
      features,
      inTheBox,
      price,
      title,
    }: CreateProductDto,
    userId: string,
    images: Express.Multer.File[],
  ) {
    if (!images || images.length !== 4) {
      throw new BadRequestException('Exactly 4 images are required');
    }

    const existUser = await this.userModel.findById(userId);
    if (!existUser || existUser.role !== 'admin') {
      throw new BadRequestException('User not found or is not an admin');
    }

    const uploaded = await Promise.all(
      images.map((file) => this.cloudinaryService.uploadImage(file)),
    );

    const defaultBoxItems = [
      { item: 'Charging Cable', quantity: 1 },
      { item: 'User Manual', quantity: 1 },
      { item: 'Cleaning Kit', quantity: 1 },
    ];

    const finalInTheBox =
      inTheBox && inTheBox.length > 0 ? inTheBox : defaultBoxItems;

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

  async findAll(category?: string) {
    const filter = category ? { category } : {};
    const products = await this.productModel.find(filter).sort({ _id: -1 });
    return products;
  }

  async findOne(id: string) {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('Invalid ID');
    }
    const product = await this.productModel.findById(id);
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }

  update(
    id: number,
    {
      category,
      description,
      features,
      inTheBox,
      price,
      title,
    }: UpdateProductDto,
  ) {
    return `This action updates a #${id} product`;
  }

  async remove(id: string, userId: string) {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('Invalid ID');
    }
    const existUser = await this.userModel.findById(userId);
    if (!existUser || existUser.role !== 'admin') {
      throw new BadRequestException('User not found or is not an admin');
    }
    const product = await this.productModel.findById(id);
    if (!product) {
      throw new NotFoundException('Product not found');
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

  async selectProduct(userId: string, productId: string, quantity: number = 1) {
    if (!isValidObjectId(productId)) {
      throw new BadRequestException('Product not found');
    }
    const product = await this.productModel.findById(productId);
    if (!product) {
      throw new BadRequestException('Product not found');
    }

    const existUser = await this.userModel.findById(userId);
    if (!existUser) {
      throw new BadRequestException('User not found');
    }

    const objectId = new mongoose.Types.ObjectId(productId);

    const existingIndex = existUser.selectedProducts.findIndex(
      (p) => p.product.toString() === productId,
    );

    if (existingIndex !== -1) {
      existUser.selectedProducts[existingIndex].quantity += quantity;
    } else {
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
}
