import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { Permissions } from '../../common/decorators/permissions.decorator';
import { CurrentUser, AuthenticatedUser } from '../../common/decorators/current-user.decorator';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RbacGuard } from '../../common/guards/rbac.guard';
import { AuditService } from '../audit/audit.service';
import { CreateStatusDto } from './dto/create-status.dto';
import { StatusesService } from './statuses.service';

@Controller('statuses')
export class StatusesController {
  constructor(
    private readonly statusesService: StatusesService,
    private readonly auditService: AuditService,
  ) {}

  @Get(':domain')
  listByDomain(@Param('domain') domain: string) {
    return this.statusesService.listByDomain(domain);
  }

  @UseGuards(JwtAuthGuard, RbacGuard)
  @Permissions('statuses.create')
  @Post()
  async create(@Body() dto: CreateStatusDto, @CurrentUser() user: AuthenticatedUser, @Req() req: Request) {
    const status = await this.statusesService.create(dto);
    await this.auditService.log({
      userId: user.id,
      module: 'statuses',
      action: 'create',
      entity: 'MasterStatus',
      entityId: status.id,
      ipAddress: req.ip,
      userAgent: req.headers['user-agent'],
      metadata: { domain: dto.domain, code: dto.code },
    });
    return status;
  }
}
