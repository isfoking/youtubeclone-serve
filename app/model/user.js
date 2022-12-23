/*
 * @Descripttion:
 * @version:
 * @Author: king
 * @Date: 2022-12-22 11:30:55
 * @LastEditors: king
 * @LastEditTime: 2022-12-23 22:39:42
 */
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const UserSchema = new Schema({
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    avatar: {
      // 头像
      type: String,
      default: null,
    },
    cover: {
      // 封面
      type: String,
      default: null,
    },
    channelDescription: {
      // 频道介绍
      type: String,
      default: null,
    },
    subscribersCount: {
      type: Number,
      default: 0,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  });

  return mongoose.model('User', UserSchema);
};
