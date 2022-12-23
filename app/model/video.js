/*
 * @Descripttion:
 * @version:
 * @Author: king
 * @Date: 2022-12-22 11:30:55
 * @LastEditors: wei
 * @LastEditTime: 2022-12-22 11:48:08
 */
module.exports = (app) => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const VideoSchema = new Schema({
    title: {
      type: String,
      required: true,
    },
    playUrl: {
      type: String,
      required: true,
    },
    cover: {
      //封面
      type: String,
      required: true,
    },
    user: {
      type: mongoose.ObjectId, //视频作者
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

  return mongoose.model('Video', VideoSchema);
};
