
const Service = require('egg').Service;
const jwt = require('jsonwebtoken');
class UserService extends Service {
  get User() {
    return this.app.model.User;
  }
  findByUsername(username) {
    return this.User.findOne({
      username,
    });
  }

  findByEmail(email) {
    return this.User.findOne({
      email,
    }).select('+password');
  }

  async createUser(data) {
    data.password = this.ctx.helper.md5(data.password);
    const user = new this.User(data);

    await user.save();
    return user;
  }

  createToken(data) {
    return jwt.sign(data, this.app.config.jwt.secret, {
      expiresIn: this.app.config.jwt.expiresIn,
    });
  }

  verifyToken(token) {
    return jwt.verify(token, this.app.config.jwt.secret);
  }

  updateUser(data) {
    return this.User.findByIdAndUpdate(this.ctx.user._id, data, {
      new: true, // 返回更新之后的信息
    });
  }

  async subscribe(userId, channelId) {
    const { Subscribe, User } = this.app.model;
    // 1.检查是否已经订阅
    const recored = await Subscribe.findOne({
      user: userId,
      channel: channelId,
    });
    const user = await User.findById(channelId);
    if (!recored) {
      new Subscribe({
        user: userId,
        channel: channelId,
      }).save();
      user.subscribersCount++;
    }

    await user.save(); // 更新到数据库中
    // 3.返回用户信息
    return user;
  }

  async unsubscribe(userId, channelId) {
    const { Subscribe, User } = this.app.model;
    const recored = await Subscribe.findOne({
      user: userId,
      channel: channelId,
    });
    const user = await User.findById(channelId);
    if (recored) {
      await recored.remove(); // 删除订阅记录
      user.subscribersCount--;
    }

    await user.save(); // 更新到数据库中
    // 3.返回用户信息
    return user;
  }
}

module.exports = UserService;
