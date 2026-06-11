import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';

export interface AuditInput {
  userId?: string;
  module: string;
  action: string;
  entity?: string;
  entityId?: string;
  metadata?: Prisma.InputJsonValue;
  ipAddress?: string;
  userAgent?: string | string[];
}

@Injectable()
export class AuditService {
  constructor(private readonly prisma: PrismaService) {}

  async log(input: AuditInput) {
    return this.prisma.auditLog.create({
      data: {
        userId: input.userId,
        module: input.module,
        action: input.action,
        entity: input.entity,
        entityId: input.entityId,
        metadata: input.metadata,
        ipAddress: input.ipAddress,
        userAgent: Array.isArray(input.userAgent) ? input.userAgent.join(', ') : input.userAgent,
      },
    });
  }

  list(filters: { module?: string; action?: string; take?: number }) {
    return this.prisma.auditLog.findMany({
      where: {
        module: filters.module,
        action: filters.action,
      },
      include: {
        user: { select: { id: true, username: true, email: true, fullName: true } },
      },
      orderBy: { createdAt: 'desc' },
      take: Math.min(filters.take ?? 50, 200),
    });
  }
}
