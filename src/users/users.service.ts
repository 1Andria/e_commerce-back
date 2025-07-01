import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { User } from './schema/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel('user') private readonly userModel: Model<User>) {}

  create(createUserDto: CreateUserDto) {
    return 'U should sign up';
  }

  async findAll() {
    return this.userModel.find();
  }

  findOne(id: string) {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('Invalid ID provided');
    }
    const user = this.userModel.findById(id);
    if (!user) {
      throw new BadRequestException('User not found');
    }

    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
