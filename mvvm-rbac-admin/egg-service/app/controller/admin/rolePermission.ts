'use strict';

import { Controller } from 'egg';
class RolePermissionController extends Controller {
  async findAll() {
    const { ctx } = this;
    const userId =  parseInt(ctx.request.query.userId);
    const result = await ctx.service.rolePermission.findAll(userId);
    ctx.body = result;
  }
}

module.exports = RolePermissionController;
