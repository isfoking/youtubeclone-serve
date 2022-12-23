/*
 * @Descripttion:
 * @version:
 * @Author: king
 * @Date: 2022-12-22 11:30:55
 * @LastEditors: wei
 * @LastEditTime: 2022-12-22 11:50:30
 */
module.exports = (app) => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const LikeSchema = new Schema({
    like: {
      type: Number,
      enum: [1, -1],
      required: true,
    },
    user: {
      type: mongoose.ObjectId, //视频作者
      required: true,
      ref: 'User',
    },
    video: {
      type: mongoose.ObjectId, //点赞视频
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

  return mongoose.model('Like', LikeSchema);
};
