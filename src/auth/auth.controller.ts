import { Body, Controller, Get, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { signUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import { IsAuthGuard } from './guards/isAuth.guard';
import { UserId } from 'src/users/decorators/user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  signUp(@Body() signUpDto: signUpDto) {
    return this.authService.signUp(signUpDto);
  }

  @Post('sign-in')
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }

  @Get('current-user')
  @UseGuards(IsAuthGuard)
  getCurrentUser(@UserId() userId) {
    return this.authService.getCurrentUser(userId);
  }
  @Patch('clear-cart')
  @UseGuards(IsAuthGuard)
  clearCart(@UserId() userId) {
    return this.authService.clearCart(userId);
  }

  @Patch('cart/increase')
  @UseGuards(IsAuthGuard)
  increaseQuantity(
    @UserId() userId: string,
    @Body('productId') productId: string,
  ) {
    return this.authService.increaseProductQuantity(userId, productId);
  }

  @Patch('cart/decrease')
  @UseGuards(IsAuthGuard)
  decreaseQuantity(
    @UserId() userId: string,
    @Body('productId') productId: string,
  ) {
    return this.authService.decreaseProductQuantity(userId, productId);
  }
}
