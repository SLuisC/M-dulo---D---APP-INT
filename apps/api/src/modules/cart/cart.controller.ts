import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { CartService } from './cart.service';

@Controller('cart') // Recuerda que NestJS le añade el /api global automáticamente
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  async addItem(@Body() body: { userId: string; productId: string; quantity: number }) {
    return this.cartService.addItemToCart(body.userId, body.productId, body.quantity);
  }

  @Get(':userId')
  async getCart(@Param('userId') userId: string) {
    return this.cartService.getCart(userId);
  }
}
