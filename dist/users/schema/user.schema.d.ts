import mongoose from 'mongoose';
export declare class User {
    email: string;
    password: string;
    role: string;
    products: mongoose.Types.ObjectId[];
    selectedProducts: {
        product: mongoose.Types.ObjectId;
        quantity: number;
    }[];
}
export declare const userSchema: mongoose.Schema<User, mongoose.Model<User, any, any, any, mongoose.Document<unknown, any, User, any> & User & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, User, mongoose.Document<unknown, {}, mongoose.FlatRecord<User>, {}> & mongoose.FlatRecord<User> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
