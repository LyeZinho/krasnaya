import { Module } from '@nestjs/common';
import { DiscordDispatcherService } from './discord-dispatcher.service';
import { AutomationsModule } from 'src/automations/automations.module';

@Module({
    imports: [AutomationsModule],
    providers: [DiscordDispatcherService],
    exports: [DiscordDispatcherService],
})
export class DiscordModule { }
