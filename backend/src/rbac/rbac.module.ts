import { Module } from '@nestjs/common';
import { RbacGuardService } from './rbac.service';

@Module({
    providers: [RbacGuardService],
    exports: [RbacGuardService],
})
export class RbacModule { }
