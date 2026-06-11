import { Module } from '@nestjs/common';
import { AuditModule } from '../audit/audit.module';
import { StatusesController } from './statuses.controller';
import { StatusesService } from './statuses.service';

@Module({
  imports: [AuditModule],
  providers: [StatusesService],
  controllers: [StatusesController],
})
export class StatusesModule {}
