/*
 * @Descripttion:
 * @version:
 * @Author: king
 * @Date: 2022-12-22 11:17:28
 * @LastEditors: wei
 * @LastEditTime: 2022-12-23 11:58:16
 */
/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = (appInfo) => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {});

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1671679024390_1450';

  // add your middleware config here
  config.middleware = ['errorHandler'];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  config.mongoose = {
    client: {
      url: 'mongodb://127.0.0.1/youtube-clone',
      options: {
        useUnifiedTopology: true,
      },
      // mongoose global plugins, expected a function or an array of function and options
      plugins: [],
    },
  };

  config.security = {
    csrf: {
      enable: false,
    },
  };

  config.jwt = {
    secret: 'f8b01755-92f7-4d38-ae32-dc45b90cdd35',
    expiresIn: '1d', //一天
  };

  return {
    ...config,
    ...userConfig,
  };
};
