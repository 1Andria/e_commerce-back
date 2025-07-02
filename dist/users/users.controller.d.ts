import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: CreateUserDto): string;
    findAll(): Promise<(import("mongoose").Document<unknown, {}, import("./schema/user.schema").User, {}> & import("./schema/user.schema").User & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    findOne(id: string): import("mongoose").Query<(import("mongoose").Document<unknown, {}, import("./schema/user.schema").User, {}> & import("./schema/user.schema").User & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null, import("mongoose").Document<unknown, {}, import("./schema/user.schema").User, {}> & import("./schema/user.schema").User & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, import("./schema/user.schema").User, "findOne", {}>;
    update(id: string, updateUserDto: UpdateUserDto): string;
    remove(id: string): string;
}
