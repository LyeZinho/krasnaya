import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AutomationsModule } from './automations/automations.module';
import { CommandsModule } from './commands/commands.module';
import { EventsModule } from './events/events.module';
import { AuditModule } from './audit/audit.module';
import { MonitorModule } from './monitor/monitor.module';
import { BullModule } from '@nestjs/bullmq';
import { DbModule } from './db/db.module';
import { RbacModule } from './rbac/rbac.module';
import { UsersModule } from './users/users.module';
import { ItemsModule } from './items/items.module';
import { BadgesModule } from './badges/badges.module';
import { RedisModule } from './db/redis.module';

@Module({
  imports: [
    BullModule.forRoot({
      connection: {
        host: process.env.REDIS_HOST || 'localhost',
        port: parseInt(process.env.REDIS_PORT || '6379'),
      },
    }),
    DbModule,
    RedisModule,
    AutomationsModule,
    CommandsModule,
    EventsModule,
    AuditModule,
    MonitorModule,
    RbacModule,
    UsersModule,
    ItemsModule,
    BadgesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
