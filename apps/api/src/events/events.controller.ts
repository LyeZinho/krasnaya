import { Controller, Get, Post, Patch, Delete, Body, Param, Query } from '@nestjs/common';
import { EventHandlersService } from './events.service';

@Controller('api/v1/events')
export class EventsController {
  constructor(private readonly eventsService: EventHandlersService) {}

  @Get('available')
  async getAvailableEvents() {
    return this.eventsService.getAvailableEvents();
  }

  @Post()
  async create(@Query('guildId') guildId: string, @Body() data: any) {
    return this.eventsService.create(guildId, data);
  }

  @Get()
  async list(@Query('guildId') guildId: string) {
    return this.eventsService.findByGuild(guildId);
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.eventsService.findById(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() data: any) {
    return this.eventsService.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.eventsService.delete(id);
  }

  @Patch(':id/toggle')
  async toggle(@Param('id') id: string, @Body('enabled') enabled: boolean) {
    return this.eventsService.toggle(id, enabled);
  }
}
