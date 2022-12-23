/*
 * @Descripttion:
 * @version:
 * @Author: king
 * @Date: 2022-12-22 11:30:55
 * @LastEditors: wei
 * @LastEditTime: 2022-12-22 11:55:51
 */
module.exports = (app) => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const SubscribeSchema = new Schema({
    user: {
      type: mongoose.ObjectId, //订阅用户
      required: true,
      ref: 'User',
    },
    channel: {
      type: mongoose.ObjectId, //订阅频道
      required: true,
      ref: 'User',
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

  return mongoose.model('Subscribe', SubscribeSchema);
};
