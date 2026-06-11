import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { AuditService } from '../audit/audit.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
    private readonly auditService: AuditService,
  ) {}

  async login(dto: LoginDto, context?: { ipAddress?: string; userAgent?: string }) {
    const user = await this.usersService.findByUsernameOrEmail(dto.usernameOrEmail);
    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const passwordOk = await bcrypt.compare(dto.password, user.passwordHash);
    if (!passwordOk) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const profile = await this.usersService.findAuthProfileById(user.id);
    if (!profile) {
      throw new UnauthorizedException('Usuario no disponible');
    }

    await this.auditService.log({
      userId: user.id,
      module: 'auth',
      action: 'login',
      entity: 'User',
      entityId: user.id,
      ipAddress: context?.ipAddress,
      userAgent: context?.userAgent,
    });

    const accessToken = await this.jwtService.signAsync({
      sub: profile.id,
      username: profile.username,
      roles: profile.roles,
      permissions: profile.permissions,
    });

    return {
      accessToken,
      tokenType: 'Bearer',
      expiresIn: this.config.get<string>('JWT_EXPIRES_IN') ?? '1d',
      user: profile,
    };
  }
}
