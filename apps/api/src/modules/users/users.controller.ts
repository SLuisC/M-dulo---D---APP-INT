import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { Permissions } from '../../common/decorators/permissions.decorator';
import { CurrentUser, AuthenticatedUser } from '../../common/decorators/current-user.decorator';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RbacGuard } from '../../common/guards/rbac.guard';
import { AuditService } from '../audit/audit.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@UseGuards(JwtAuthGuard, RbacGuard)
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly auditService: AuditService,
  ) {}

  @Permissions('users.read')
  @Get()
  list() {
    return this.usersService.list();
  }

  @Permissions('users.create')
  @Post()
  async create(@Body() dto: CreateUserDto, @CurrentUser() currentUser: AuthenticatedUser, @Req() req: Request) {
    const created = await this.usersService.create(dto);
    await this.auditService.log({
      userId: currentUser.id,
      module: 'users',
      action: 'create',
      entity: 'User',
      entityId: created.id,
      ipAddress: req.ip,
      userAgent: req.headers['user-agent'],
      metadata: { username: created.username, roles: dto.roleCodes },
    });
    return created;
  }
}
