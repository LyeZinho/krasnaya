import { Controller, Get, Post, Patch, Delete, Body, Param, Query, HttpStatus, HttpException } from '@nestjs/common';
import { CommandsService } from './commands.service';

@Controller('api/v1/commands')
export class CommandsController {
  constructor(private readonly commandsService: CommandsService) {}

  @Post()
  async create(@Query('guildId') guildId: string, @Body() data: any) {
    if (!guildId) {
      throw new HttpException('guildId is required', HttpStatus.BAD_REQUEST);
    }
    try {
      return await this.commandsService.create(guildId, data);
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get()
  async list(@Query('guildId') guildId: string) {
    if (!guildId) {
      throw new HttpException('guildId is required', HttpStatus.BAD_REQUEST);
    }
    try {
      return await this.commandsService.findByGuild(guildId);
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    try {
      const result = await this.commandsService.findById(id);
      if (!result) {
        throw new HttpException('Command not found', HttpStatus.NOT_FOUND);
      }
      return result;
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() data: any) {
    try {
      return await this.commandsService.update(id, data);
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    try {
      return await this.commandsService.delete(id);
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Patch(':id/toggle')
  async toggle(@Param('id') id: string, @Body('enabled') enabled: boolean) {
    try {
      return await this.commandsService.toggle(id, enabled);
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('validate')
  async validate(
    @Query('guildId') guildId: string,
    @Body() data: { prefix: string; name: string }
  ) {
    if (!guildId) {
      throw new HttpException('guildId is required', HttpStatus.BAD_REQUEST);
    }
    try {
      return await this.commandsService.validateCommand(guildId, data.prefix, data.name);
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
