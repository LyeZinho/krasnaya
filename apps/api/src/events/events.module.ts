import { Module } from '@nestjs/common';
import { EventHandlersService } from './events.service';
import { EventsController } from './events.controller';
import { DbModule } from '../db/db.module';

@Module({
  imports: [DbModule],
  providers: [EventHandlersService],
  controllers: [EventsController],
  exports: [EventHandlersService],
})
export class EventsModule {}
