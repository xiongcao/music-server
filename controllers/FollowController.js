const FollowService = require('../service/FollowService');


module.exports = {
  /**
   * 查询 所有 关注用户 或 粉丝用户
   * @type 1: 关注 2: 粉丝
   */
  'GET /api/follow/list': async ctx => {
    if (await ctx.isNotLogin()) {
      return
    }

    const userId = ctx.session.userId;
    const { type, page, size } = ctx.request.query;
    let list = [];
    if (type == 1) { // 关注
      list = await FollowService.findAllFollw({ userId, page, size });
    } else {
      list = await FollowService.findAllFans({ userId, page, size });
    }
    if (list) {
      ctx.rest(list);
    } else {
      ctx.rest(null, 1, '失败');
    }
  },

  /**
   * 添加 关注
   */
  'POST /api/follow': async ctx => {
    if (await ctx.isNotLogin()) {
      return
    }
    let res;
    const userId = ctx.session.userId;
    const follow = ctx.request.body;

    if (follow && follow.singerId) {
      const { singerId } = follow;
      // 查询是否 已存在 该数据，只是被取消了喜欢状态
      const follow1 = await FollowService.findFollow(userId, singerId);
      if (follow1) { // 存在，只需修改原数据
        res = await FollowService.update(userId, singerId, 1);
      } else {
        follow.userId = userId;
        res = await FollowService.create(follow);
      }
      if (res) {
        ctx.rest();
      } else {
        ctx.rest(null, 1, '失败');
      }
    } else {
      ctx.rest(null, 1, '参数错误');
    }
  },

  /**
   * 取消 关注
   * @id 歌曲ID
   */
  'PUT /api/follow/:id': async ctx => {
    if (await ctx.isNotLogin()) {
      return
    }
    const { id } = ctx.request.params;
    const userId = ctx.session.userId;
    const res = await FollowService.update(userId, id, 0);
    if (res) {
      ctx.rest();
    } else {
      ctx.rest(null, 1, '失败');
    }
  }
};