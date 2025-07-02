import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Model } from 'mongoose';
import { User } from './schema/user.schema';
export declare class UsersService {
    private readonly userModel;
    constructor(userModel: Model<User>);
    create(createUserDto: CreateUserDto): string;
    findAll(): Promise<(import("mongoose").Document<unknown, {}, User, {}> & User & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    findOne(id: string): import("mongoose").Query<(import("mongoose").Document<unknown, {}, User, {}> & User & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null, import("mongoose").Document<unknown, {}, User, {}> & User & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, User, "findOne", {}>;
    update(id: number, updateUserDto: UpdateUserDto): string;
    remove(id: number): string;
}
