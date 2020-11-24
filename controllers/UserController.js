const UserService = require('../service/UserService');

const crypto = require('crypto');

module.exports = {
  'GET /signin': async ctx => {
    ctx.render('signin.html');
  },

  'GET /register': async ctx => {
    ctx.render('register.html');
  },

  // 用户名登录
  'POST /api/signin/phoneNumber': async ctx => {
    const hash = crypto.createHash('md5');
    const { name, password } = ctx.request.body;
    let md5Password = hash.update(password).digest('hex'); // 加密后的密码
    const user = await UserService.findUserByNameAndPassword(name, md5Password);
    if (user) {
      ctx.session = {
        userId: user.id,
        userName: user.name
      }
      ctx.rest(null, 0, '登录成功');
    } else {
      ctx.rest(user, 1, '用户名或密码错误');
    }
  },

  // 手机号登录
  'POST /api/signin/phoneNumber': async ctx => {
    const hash = crypto.createHash('md5');
    const { phoneNumber, password } = ctx.request.body;
    let md5Password = hash.update(password).digest('hex'); // 加密后的密码
    const user = await UserService.findUserByPhoneAndPassword(phoneNumber, md5Password);
    if (user) {
      ctx.session = {
        userId: user.id,
        userName: user.name
      }
      ctx.rest(null, 0, '登录成功');
    } else {
      ctx.rest(user, 1, '手机号或密码错误');
    }
  },

  // 注册
  'POST /api/register': async ctx => {
    const hash = crypto.createHash('md5');
    const { name, phoneNumber, password } = ctx.request.body;
    const user = await UserService.findUserByName(name);
    if (user) {
      ctx.rest(user, 1, '注册失败，该用户名已被使用');
      return
    }

    const user2 = await UserService.findUserByPhoneNumber(phoneNumber);
    if (user) {
      ctx.rest(user, 1, '注册失败，该手机号已注册');
      return
    }

    let md5Password = hash.update(password).digest('hex'); // 加密后的密码
    // 保存用户信息
    const u = await UserService.createUser({ name, password: md5Password });
    if (u) {
      ctx.rest(null, 0, '注册成功');
    } else {
      ctx.rest(null, 1, '注册失败');
    }
  },

  // 根据ID查询用户
  'GET /api/user/:id': async ctx => {
    const { id } = ctx.request.params;
    const res = await UserService.findUserById(id);
    if (res) {
      ctx.rest(res);
    } else {
      ctx.rest(null, 1, '失败');
    }
  },

  'GET /api/signout': async ctx => {
    ctx.cookies.set('token', '');
    ctx.session = {};
    ctx.rest(null, 0, '退出成功');
  }
};