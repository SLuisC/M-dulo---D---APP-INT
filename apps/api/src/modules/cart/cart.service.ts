import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class CartService {
  constructor(private prisma: PrismaService) {}

  async addItemToCart(userId: string, productId: string, quantity: number) {
    // 1. Busca si el usuario ya tiene un carrito, si no, lo crea
    let cart = await this.prisma.cart.findUnique({
      where: { userId },
    });

    if (!cart) {
      cart = await this.prisma.cart.create({
        data: { userId },
      });
    }

    // 2. Agrega el item al carrito
    // Nota: Asegúrate de que 'price' coincida con el tipo definido en tu schema.prisma
    return this.prisma.cartItem.create({
      data: {
        cartId: cart.id,
        productId,
        quantity,
        price: 0, // Ajusta este valor según la lógica de tu negocio (ej. consultar el precio real del producto)
      },
    });
  }

  async getCart(userId: string) {
    return this.prisma.cart.findUnique({
      where: { userId },
      include: { items: true },
    });
  }
}

