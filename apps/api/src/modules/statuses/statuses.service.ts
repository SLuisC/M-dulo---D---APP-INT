import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateStatusDto } from './dto/create-status.dto';

@Injectable()
export class StatusesService {
  constructor(private readonly prisma: PrismaService) {}

  listByDomain(domain: string) {
    return this.prisma.masterStatus.findMany({
      where: { domain, isActive: true },
      orderBy: [{ sortOrder: 'asc' }, { code: 'asc' }],
    });
  }

  create(dto: CreateStatusDto) {
    return this.prisma.masterStatus.create({
      data: {
        domain: dto.domain,
        code: dto.code,
        name: dto.name,
        description: dto.description,
        isActive: dto.isActive ?? true,
        sortOrder: dto.sortOrder ?? 0,
      },
    });
  }
}
