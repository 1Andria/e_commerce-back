import { AuthService } from './auth.service';
import { signUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signUp(signUpDto: signUpDto): Promise<{
        message: string;
        newUser: import("mongoose").Document<unknown, {}, import("../users/schema/user.schema").User, {}> & import("../users/schema/user.schema").User & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        };
    }>;
    signIn(signInDto: SignInDto): Promise<{
        token: string;
    }>;
    getCurrentUser(userId: any): Promise<(import("mongoose").Document<unknown, {}, import("../users/schema/user.schema").User, {}> & import("../users/schema/user.schema").User & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
    clearCart(userId: any): Promise<string>;
    increaseQuantity(userId: string, productId: string): Promise<{
        product: import("mongoose").Types.ObjectId;
        quantity: number;
    }[]>;
    decreaseQuantity(userId: string, productId: string): Promise<{
        product: import("mongoose").Types.ObjectId;
        quantity: number;
    }[]>;
}
