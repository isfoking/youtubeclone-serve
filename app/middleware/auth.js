// eslint-disable-next-line no-unused-vars
module.exports = (options = { required: true }) => {
  return async (ctx, next) => {
    // 1.获取请求头中的token
    let token = ctx.headers.authorization; // Bearer 空格 token数据
    token = token
      ? token.split('Bearer ')[1] : null;


    if (token) {
      // 3.token有效 根据userId 获取用户数据挂载到ctx对象中
      try {
        const data = ctx.service.user.verifyToken(token);
        ctx.user = await ctx.model.User.findById(data.userId);
      } catch (error) {
        ctx.throw(401);
      }
    } else if (options.required) {
      ctx.throw(401);
    }


    // 4.next 执行后续中间件
    await next();
  };
};
