import { Module } from '@nestjs/common';
import { AuditLogsService } from './audit.service';
import { AuditController } from './audit.controller';
import { DbModule } from '../db/db.module';

@Module({
  imports: [DbModule],
  providers: [AuditLogsService],
  controllers: [AuditController],
  exports: [AuditLogsService],
})
export class AuditModule {}
