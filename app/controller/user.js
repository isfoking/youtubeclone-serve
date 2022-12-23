/*
 * @Descripttion:
 * @version:
 * @Author: king
 * @Date: 2022-12-22 15:07:40
 * @LastEditors: king
 * @LastEditTime: 2022-12-23 23:49:17
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
    // 生成token
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

  async getCurrentUser() {
    // 验证token
    const user = this.ctx.user;
    this.ctx.body = {
      user: {
        email: user.email,
        token: this.ctx.headers.authorization,
        username: user.username,
        channeIDescription: user.channeIDescription,
        avatar: user.avatar,
      },
    };
  }

  async update() {
    const body = this.ctx.request.body;
    this.ctx.validate({
      username: { type: 'string', required: false },
      email: { type: 'email', required: false },
      password: { type: 'string', required: false },
      channeIDescription: { type: 'string', required: false },
      avatar: { type: 'string', required: false },
    }, body);

    const UserService = this.service.user;
    if (body.username) {
      if (body.username !== this.ctx.user.username && await UserService.findByUsername(body.findByUsername)) {
        this.ctx.throw(422, '用户已存在');
      }
    }
    if (body.email) {
      if (body.email !== this.ctx.user.email && await UserService.findByEmail(body.email)) {
        this.ctx.throw(422, '邮箱已存在');
      }
    }

    if (body.password) {
      body.password = this.ctx.header.md5(body.password);
    }

    const user = await UserService.updateUser(body);
    this.ctx.body = {
      user: {
        email: user.email,
        password: user.password,
        username: user.username,
        channelDescription: user.channelDescription,
        avatar: user.avatar,
      },
    };

  }
  async subscribe() {
    const userId = this.ctx.user._id;
    const channelId = this.ctx.params.userId;
    // 用户不能订阅自己
    if (userId === channelId) {
      this.ctx.throw(422, '用户不能订阅自己');
    }
    // 添加订阅
    const user = await this.service.user.subscribe(userId, channelId);
    this.ctx.body = {
      user: {
        ...this.ctx.helper._.pick(user, [
          'username',
          'email',
          'avatar',
          'cpver',
          'subscribersCount',
          'channelDescription',
        ]),
        isSubscribed: true,
      },
    };

  }

  async unsubscribe() {
    const userId = this.ctx.user._id;
    const channelId = this.ctx.params.userId;
    // 用户不能订阅自己
    if (userId === channelId) {
      this.ctx.throw(422, '用户不能订阅自己');
    }
    // 取消订阅
    const user = await this.service.user.unsubscribe(userId, channelId);
    this.ctx.body = {
      user: {
        ...this.ctx.helper._.pick(user, [
          'username',
          'email',
          'avatar',
          'cpver',
          'subscribersCount',
          'channelDescription',
        ]),
        isSubscribed: false,
      },
    };

  }
  async getUser() {
    // 1.获取订阅状态
    let isSubscribed = false;
    if (this.ctx.user) {
      // 获取订阅记录
      const record = await this.app.model.Subscribe.findOne({
        user: this.ctx.user._id,
        channel: this.ctx.params.userId,
      });

      if (record) {
        isSubscribed = true;
      }
    }
    // 2.户取用户信息
    const user = await this.app.model.User.findById(this.ctx.params.userId);
    this.ctx.body = {
      user: {
        ...this.ctx.helper._.pick(user, [
          'username',
          'email',
          'avatar',
          'cpver',
          'subscribersCount',
          'channelDescription',
        ]),
        isSubscribed,
      },
    };
  }
  async getSubscriptions() {
    const Subscribe = this.app.model.Subscribe;
    let subscriptions = await Subscribe.find({
      user: this.ctx.params.userId,
    }).populate('channel');

    subscriptions = subscriptions.map(item => {
      return this.ctx.helper._.pick(item.channel, [
        '_id',
        'username',
        'avatar',
      ]);
    });
    this.ctx.body = {
      subscriptions,
    };
  }
}

module.exports = UserController;
