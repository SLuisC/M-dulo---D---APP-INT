import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class RolesService {
  constructor(private readonly prisma: PrismaService) {}

  list() {
    return this.prisma.role.findMany({
      select: {
        id: true,
        code: true,
        name: true,
        description: true,
        rolePermissions: {
          select: { permission: { select: { code: true, module: true, action: true } } },
        },
      },
      orderBy: { code: 'asc' },
    });
  }
}
