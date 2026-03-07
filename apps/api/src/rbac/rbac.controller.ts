import { Controller, Get, Post, Patch, Delete, Body, Param, Query } from '@nestjs/common';
import { RbacService } from './rbac.service';

@Controller('api/v1/admin/rbac')
export class RBACController {
  constructor(private readonly rbacService: RbacService) {}

  // ============ ROLES ============

  @Post('roles')
  async createRole(@Query('guildId') guildId: string, @Body() data: any) {
    return this.rbacService.createRole(guildId, data);
  }

  @Get('roles')
  async getRoles(@Query('guildId') guildId: string) {
    return this.rbacService.getRoles(guildId);
  }

  @Get('roles/:id')
  async getRole(@Param('id') id: string) {
    return this.rbacService.getRole(id);
  }

  @Patch('roles/:id')
  async updateRole(@Param('id') id: string, @Body() data: any) {
    return this.rbacService.updateRole(id, data);
  }

  @Delete('roles/:id')
  async deleteRole(@Param('id') id: string) {
    return this.rbacService.deleteRole(id);
  }

  // ============ PERMISSIONS ============

  @Get('permissions')
  async getAvailablePermissions() {
    return this.rbacService.getAvailablePermissions();
  }

  @Post('permissions/grant')
  async grantPermission(@Body() data: { roleId: string; permissionId: string }) {
    return this.rbacService.grantPermission(data.roleId, data.permissionId);
  }

  @Post('permissions/deny')
  async denyPermission(@Body() data: { roleId: string; permissionId: string }) {
    return this.rbacService.denyPermission(data.roleId, data.permissionId);
  }

  @Get('permissions/role/:roleId')
  async getRolePermissions(@Param('roleId') roleId: string) {
    return this.rbacService.getRolePermissions(roleId);
  }

  @Delete('permissions/:id')
  async removePermission(@Param('id') id: string) {
    return this.rbacService.removePermission(id);
  }

  // ============ USER ROLES ============

  @Post('user-roles')
  async assignRole(@Body() data: { userId: string; guildId: string; roleId: string }) {
    return this.rbacService.assignRole(data.userId, data.guildId, data.roleId);
  }

  @Delete('user-roles')
  async removeRole(@Body() data: { userId: string; guildId: string; roleId: string }) {
    return this.rbacService.removeRole(data.userId, data.guildId, data.roleId);
  }

  @Get('user-roles')
  async getUserRoles(@Query('userId') userId: string, @Query('guildId') guildId: string) {
    return this.rbacService.getUserRoles(userId, guildId);
  }

  // ============ AUTHORIZATION ============

  @Post('check')
  async checkPermission(@Body() data: { userId: string; guildId: string; resource: string; action: string }) {
    const has = await this.rbacService.hasPermission(
      data.userId,
      data.guildId,
      data.resource,
      data.action
    );
    return { hasPermission: has };
  }
}
