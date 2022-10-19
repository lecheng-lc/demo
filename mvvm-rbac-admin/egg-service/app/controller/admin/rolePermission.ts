'use strict';

import { Controller } from 'egg';
class RolePermissionController extends Controller {
  async findAll() {
    const { ctx } = this;
    console.log(ctx.request.query);
    const userId =  parseInt(ctx.request.query.userId);
    const result = await ctx.service.rolePermission.findAll(userId);
    ctx.body = result;
  }
}

module.exports = RolePermissionController;
