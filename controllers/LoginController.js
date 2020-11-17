const UserService = require('../service/UserService');
const APIError = require('../rest').APIError;

const crypto = require('crypto');

module.exports = {
  'GET /signin': async (ctx, next) => {
    ctx.render('signin.html');
  },

  'GET /register': async (ctx, next) => {
    ctx.render('register.html');
  },

  'POST /api/signin': async (ctx, next) => {
    const hash = crypto.createHash('md5');
    const { name, password } = ctx.request.body;
    let md5Password = hash.update(password).digest('hex'); // 加密后的密码
    const user = await UserService.findUserByNameAndPassword(name, md5Password);
    if (user) {
      // 设置session
      ctx.session = {
        userId: user.id,
        userName: user.name
      }
      ctx.rest(null, 0, '登录成功');
    } else {
      ctx.rest(user, 1, '用户名或密码错误');
    }
  },

  'POST /api/register': async (ctx, next) => {
    const hash = crypto.createHash('md5');
    const { name, password } = ctx.request.body;
    const user = await UserService.findUserByName(name);
    if (user) {
      ctx.rest(user, 1, '注册失败，该用户名已被使用');
    } else {
      let md5Password = hash.update(password).digest('hex'); // 加密后的密码
      // 保存用户信息
      const u = await UserService.createUser({ name, password: md5Password });
      if (u) {
        ctx.rest(null, 0, '注册成功');
      } else {
        ctx.rest(null, 1, '注册失败');
      }
    }
  },

  'GET /api/signout': async (ctx, next) => {
    ctx.cookies.set('token', '');
    ctx.session = {};
    ctx.rest(null, 0, '退出成功');
  }
};