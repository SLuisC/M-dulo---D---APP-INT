import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { Permissions } from '../../common/decorators/permissions.decorator';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RbacGuard } from '../../common/guards/rbac.guard';
import { AuditService } from './audit.service';

@UseGuards(JwtAuthGuard, RbacGuard)
@Controller('audit-logs')
export class AuditController {
  constructor(private readonly auditService: AuditService) {}

  @Permissions('audit.read')
  @Get()
  list(@Query('module') module?: string, @Query('action') action?: string, @Query('take') take?: string) {
    return this.auditService.list({ module, action, take: take ? Number(take) : undefined });
  }
}
