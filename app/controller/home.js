/*
 * @Descripttion:
 * @version:
 * @Author: king
 * @Date: 2022-12-22 11:17:28
 * @LastEditors: wei
 * @LastEditTime: 2022-12-22 11:34:11
 */
'use strict';

const { Controller } = require('egg');

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    const User = this.app.model.User;
    await new User({
      userName: 'zs',
      password: '312314',
    }).save();
    ctx.body = 'hi, egg';
  }
}

module.exports = HomeController;
