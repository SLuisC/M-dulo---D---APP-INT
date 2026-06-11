import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { UpdateSettingDto } from './dto/update-setting.dto';

@Injectable()
export class SettingsService {
  constructor(private readonly prisma: PrismaService) {}

  list(publicOnly = false) {
    return this.prisma.systemSetting.findMany({
      where: publicOnly ? { isPublic: true } : undefined,
      orderBy: { key: 'asc' },
    });
  }

  update(key: string, dto: UpdateSettingDto) {
    return this.prisma.systemSetting.upsert({
      where: { key },
      update: {
        value: dto.value,
        description: dto.description,
        isPublic: dto.isPublic,
      },
      create: {
        key,
        value: dto.value,
        description: dto.description,
        isPublic: dto.isPublic ?? false,
      },
    });
  }
}
