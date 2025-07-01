import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { IsAuthGuard } from 'src/auth/guards/isAuth.guard';
import { UserId } from 'src/users/decorators/user.decorator';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('products')
export class ProductsController {
  constructor(
    private cloudinaryService: CloudinaryService,
    private readonly productsService: ProductsService,
  ) {}

  @Post()
  @UseGuards(IsAuthGuard)
  @UseInterceptors(FilesInterceptor('images', 4))
  create(
    @UploadedFiles() images: Express.Multer.File[],
    @UserId() userId,
    @Body() createProductDto: CreateProductDto,
  ) {
    return this.productsService.create(createProductDto, userId, images);
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  @UseGuards(IsAuthGuard)
  remove(@UserId() userId, @Param('id') id: string) {
    return this.productsService.remove(id, userId);
  }
}
