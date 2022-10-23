import AuthException from '../exception/auth' 
module.exports = name => { // 此处name为 auth(xxx) 的xxx
  return async function auth(ctx, next) {
    // 获取token
    let token = ctx.request.headers.authorization;
    if(token) {
      token = token.split(' ')[1] 
      // 通过token获取用户id
      const resData = await ctx.service.jwt.getUserIdFromToken(token);
      if(typeof resData !== 'string') {
        ctx.status = 200  
        ctx.body = resData 
        return 
      } else {
        new AuthException('权限不足', 10002);
        await checkAuth(resData, ctx);
        await next();
      }
    }
  };
  async function checkAuth (userId, ctx) {
    console.log(userId, ctx,name) 
    return true
    // if (!name) {
    //   return true;
    // }
   	// // 查询菜单是否存在
    // const menu = await ctx.model.AdminMenu.findOne({ where: { api_route_name: name } });
    // if (menu === null) {
    //   return true;
    // }
    // // 查询用户绑定的角色
    // const roles = await ctx.model.AdminRoleUser.findAll({ attributes: [ 'role_id' ], where: { user_id: userId } });
    // const roleIds = roles.map(item => item.role_id);
    // if (roleIds.includes(1)) {
    //   return true;
    // }
    // const Op = ctx.app.Sequelize.Op;
    // // 查询用户是否有菜单的权限
    // const hasAccess = await ctx.model.AdminRoleMenu.findOne({ where: { role_id: { [Op.in]: roleIds }, menu_id: menu.id } });
    // if (hasAccess === null) {
    //   throw new AuthException('权限不足', 10002);
    // }
  }
};