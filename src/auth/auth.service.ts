import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/schema/user.schema';
import { signUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('user') private readonly userModel: Model<User>,
    private jwtService: JwtService,
  ) {}
  async signUp({ email, password }: signUpDto) {
    const existUser = await this.userModel.findOne({ email });
    if (existUser) {
      throw new BadRequestException('User already exists');
    }
    const hashedPass = await bcrypt.hash(password, 10);
    const newUser = await this.userModel.create({
      email,
      password: hashedPass,
    });
    return { message: 'created successfully', newUser };
  }

  async signIn({ email, password }: SignInDto) {
    const existUser = await this.userModel
      .findOne({ email })
      .select('password');
    if (!existUser) {
      throw new BadRequestException('Invalid credentials');
    }

    const isPassEqual = await bcrypt.compare(password, existUser.password);

    if (!isPassEqual) {
      throw new BadRequestException('Invalid credentials');
    }

    const payLoad = {
      id: existUser._id,
    };
    const token = this.jwtService.sign(payLoad, { expiresIn: '1h' });

    return { token };
  }
  async getCurrentUser(userId: string) {
    const user = await this.userModel.findById(userId);
    return user;
  }

  async clearCart(userId: string) {
    await this.userModel.findByIdAndUpdate(userId, { selectedProducts: [] });
    return 'cleared';
  }

  async increaseProductQuantity(userId: string, productId: string) {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new BadRequestException('user not found');
    }
    const selected = user.selectedProducts;

    const index = selected.findIndex(
      (el) => el.product.toString() === productId,
    );
    if (index !== -1) {
      selected[index].quantity += 1;
      await user.save();
    }

    return user.selectedProducts;
  }

  async decreaseProductQuantity(userId: string, productId: string) {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new BadRequestException('user not found');
    }
    const selected = user.selectedProducts;

    const index = selected.findIndex((p) => p.product.toString() === productId);
    if (index !== -1 && selected[index].quantity > 1) {
      selected[index].quantity -= 1;
      await user.save();
    }

    return user.selectedProducts;
  }
}
