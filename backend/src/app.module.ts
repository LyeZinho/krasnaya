import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AutomationsModule } from './automations/automations.module';
import { MonitorModule } from './monitor/monitor.module';
import { BullModule } from '@nestjs/bullmq';
import { DbModule } from './db/db.module';
import { RbacModule } from './rbac/rbac.module';

@Module({
  imports: [
    BullModule.forRoot({
      connection: {
        host: process.env.REDIS_HOST || 'localhost',
        port: parseInt(process.env.REDIS_PORT || '6379'),
      },
    }),
    DbModule,
    AutomationsModule,
    MonitorModule,
    RbacModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
