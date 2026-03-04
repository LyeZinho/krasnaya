import { Module } from '@nestjs/common';
import { AutomationsService } from './automations.service';
import { AutomationsProcessor } from './automations.processor';
import { BullModule } from '@nestjs/bullmq';

@Module({
    imports: [
        BullModule.registerQueue({
            name: 'automations',
        }),
    ],
    providers: [AutomationsService, AutomationsProcessor],
    exports: [AutomationsService],
})
export class AutomationsModule { }
