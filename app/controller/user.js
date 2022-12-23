/*
 * @Descripttion:
 * @version:
 * @Author: king
 * @Date: 2022-12-22 15:07:40
 * @LastEditors: wei
 * @LastEditTime: 2022-12-23 17:48:43
 */
const { Controller } = require('egg');

class UserController extends Controller {
  async create() {
    const body = this.ctx.request.body;
    this.ctx.validate({
      username: { type: 'string' },
      email: { type: 'email' },
      password: { type: 'string' },
    });

    const UserService = this.service.user;
    if (await UserService.findByUsername(body.username)) {
      this.ctx.throw(422, '用户已存在');
    }
    if (await UserService.findByEmail(body.email)) {
      this.ctx.throw(422, '邮箱已存在');
    }

    const user = await UserService.createUser(body);
    //生成token
    const token = UserService.createToken({
      userId: user._id,
    });
    this.ctx.body = {
      user: {
        email: user.email,
        token,
        username: user.username,
        channeIDescription: user.channeIDescription,
        avatar: user.avatar,
      },
    };
  }

  async login() {
    const body = this.ctx.request.body;
    // 1.基本的数据校验
    this.ctx.validate(
      {
        email: { type: 'email' },
        password: { type: 'string' },
      },
      body
    );

    const UserService = this.service.user;
    const user = await UserService.findByEmail(body.email);

    if (!user) {
      this.ctx.throw(422, '用户不存在');
    }
    if (this.ctx.helper.md5(body.password) !== user.password) {
      this.ctx.throw(422, '密码错误');
    }

    const token = UserService.createToken({ userId: user._id });
    this.ctx.body = {
      user: {
        email: user.email,
        token,
        username: user.username,
        channeIDescription: user.channeIDescription,
        avatar: user.avatar,
      },
    };
  }
}

module.exports = UserController;
