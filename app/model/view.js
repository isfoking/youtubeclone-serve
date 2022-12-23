/*
 * @Descripttion:
 * @version:
 * @Author: king
 * @Date: 2022-12-22 11:30:55
 * @LastEditors: wei
 * @LastEditTime: 2022-12-22 11:57:45
 */
module.exports = (app) => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const ViewSchema = new Schema({
    user: {
      type: mongoose.ObjectId, //用户
      required: true,
      ref: 'User',
    },
    video: {
      type: mongoose.ObjectId, //视频
      required: true,
      ref: 'Video',
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

  return mongoose.model('View', ViewSchema);
};
