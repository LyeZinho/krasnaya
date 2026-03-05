import { Module } from '@nestjs/common';
import { AutomationsService } from './automations.service';
import { AutomationsProcessor } from './automations.processor';
import { AutomationsController } from './automations.controller';
import { BullModule } from '@nestjs/bullmq';

@Module({
    imports: [
        BullModule.registerQueue({
            name: 'automations',
        }),
    ],
    controllers: [AutomationsController],
    providers: [AutomationsService, AutomationsProcessor],
    exports: [AutomationsService],
})
export class AutomationsModule { }
