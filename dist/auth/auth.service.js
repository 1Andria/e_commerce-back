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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    userModel;
    jwtService;
    constructor(userModel, jwtService) {
        this.userModel = userModel;
        this.jwtService = jwtService;
    }
    async signUp({ email, password }) {
        const existUser = await this.userModel.findOne({ email });
        if (existUser) {
            throw new common_1.BadRequestException('User already exists');
        }
        const hashedPass = await bcrypt.hash(password, 10);
        const newUser = await this.userModel.create({
            email,
            password: hashedPass,
        });
        return { message: 'created successfully', newUser };
    }
    async signIn({ email, password }) {
        const existUser = await this.userModel
            .findOne({ email })
            .select('password');
        if (!existUser) {
            throw new common_1.BadRequestException('Invalid credentials');
        }
        const isPassEqual = await bcrypt.compare(password, existUser.password);
        if (!isPassEqual) {
            throw new common_1.BadRequestException('Invalid credentials');
        }
        const payLoad = {
            id: existUser._id,
        };
        const token = this.jwtService.sign(payLoad, { expiresIn: '1h' });
        return { token };
    }
    async getCurrentUser(userId) {
        const user = await this.userModel.findById(userId);
        return user;
    }
    async clearCart(userId) {
        await this.userModel.findByIdAndUpdate(userId, { selectedProducts: [] });
        return 'cleared';
    }
    async increaseProductQuantity(userId, productId) {
        const user = await this.userModel.findById(userId);
        if (!user) {
            throw new common_1.BadRequestException('user not found');
        }
        const selected = user.selectedProducts;
        const index = selected.findIndex((el) => el.product.toString() === productId);
        if (index !== -1) {
            selected[index].quantity += 1;
            await user.save();
        }
        return user.selectedProducts;
    }
    async decreaseProductQuantity(userId, productId) {
        const user = await this.userModel.findById(userId);
        if (!user) {
            throw new common_1.BadRequestException('user not found');
        }
        const selected = user.selectedProducts;
        const index = selected.findIndex((p) => p.product.toString() === productId);
        if (index !== -1 && selected[index].quantity > 1) {
            selected[index].quantity -= 1;
            await user.save();
        }
        return user.selectedProducts;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('user')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map