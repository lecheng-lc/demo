'use strict'

import { Controller } from 'egg'


class LoginController extends Controller {
  async login() {
    const { ctx } = this
    const body = await ctx.request.body; 
    console.log(body)
    console.log('==========')
    const result = await ctx.service.login.login(body)
    ctx.body = result
  }
  async logout() {
    const { ctx } = this 
    const result = await ctx.service.login.logout()
    ctx.body = result
  }
}

module.exports = LoginController;