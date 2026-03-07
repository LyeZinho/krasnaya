import { Module } from '@nestjs/common';
import { DbModule } from '../db/db.module';
import { RbacService } from './rbac.service';
import { RBACController } from './rbac.controller';

@Module({
  imports: [DbModule],
  providers: [RbacService],
  controllers: [RBACController],
  exports: [RbacService],
})
export class RbacModule {}
