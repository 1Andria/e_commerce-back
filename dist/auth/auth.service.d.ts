import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/schema/user.schema';
import { signUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
export declare class AuthService {
    private readonly userModel;
    private jwtService;
    constructor(userModel: Model<User>, jwtService: JwtService);
    signUp({ email, password }: signUpDto): Promise<{
        message: string;
        newUser: import("mongoose").Document<unknown, {}, User, {}> & User & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        };
    }>;
    signIn({ email, password }: SignInDto): Promise<{
        token: string;
    }>;
    getCurrentUser(userId: string): Promise<(import("mongoose").Document<unknown, {}, User, {}> & User & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
    clearCart(userId: string): Promise<string>;
    increaseProductQuantity(userId: string, productId: string): Promise<{
        product: import("mongoose").Types.ObjectId;
        quantity: number;
    }[]>;
    decreaseProductQuantity(userId: string, productId: string): Promise<{
        product: import("mongoose").Types.ObjectId;
        quantity: number;
    }[]>;
}
