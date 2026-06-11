import { Body, Controller, Get, Param, Put, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { Permissions } from '../../common/decorators/permissions.decorator';
import { CurrentUser, AuthenticatedUser } from '../../common/decorators/current-user.decorator';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RbacGuard } from '../../common/guards/rbac.guard';
import { AuditService } from '../audit/audit.service';
import { UpdateSettingDto } from './dto/update-setting.dto';
import { SettingsService } from './settings.service';

@Controller('settings')
export class SettingsController {
  constructor(
    private readonly settingsService: SettingsService,
    private readonly auditService: AuditService,
  ) {}

  @Get('public')
  publicSettings() {
    return this.settingsService.list(true);
  }

  @UseGuards(JwtAuthGuard, RbacGuard)
  @Permissions('settings.read')
  @Get()
  list() {
    return this.settingsService.list(false);
  }

  @UseGuards(JwtAuthGuard, RbacGuard)
  @Permissions('settings.update')
  @Put(':key')
  async update(
    @Param('key') key: string,
    @Body() dto: UpdateSettingDto,
    @CurrentUser() user: AuthenticatedUser,
    @Req() req: Request,
  ) {
    const setting = await this.settingsService.update(key, dto);
    await this.auditService.log({
      userId: user.id,
      module: 'settings',
      action: 'update',
      entity: 'SystemSetting',
      entityId: setting.id,
      ipAddress: req.ip,
      userAgent: req.headers['user-agent'],
      metadata: { key, value: dto.value },
    });
    return setting;
  }
}
