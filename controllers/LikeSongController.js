const LikeSongService = require('../service/LikeSongService');


module.exports = {
  /**
   * 查询 所有 喜欢的歌曲
   */
  'GET /api/likeSong/list': async ctx => {
    if (await ctx.isNotLogin()) {
      return
    }

    const userId = ctx.session.userId;
    const { page, size } = ctx.request.query;
    const list = await LikeSongService.findAllPageByUserId({ userId, page, size });
    if (list) {
      ctx.rest(list);
    } else {
      ctx.rest(null, 1, '失败');
    }
  },

  /**
   * 添加喜欢的歌曲
   */
  'POST /api/likeSong': async ctx => {
    if (await ctx.isNotLogin()) {
      return
    }
    let res;
    const userId = ctx.session.userId;
    const likeSong = ctx.request.body;

    if (likeSong && likeSong.songId) {
      const { songId } = likeSong;
      // 查询是否 已存在 改数据，只是被取消了喜欢状态
      const song = await LikeSongService.findByUserIdAndSongId(userId, songId);
      if (song) { // 存在，只需修改原数据
        res = await LikeSongService.addlLike(song.id);
      } else {
        likeSong.userId = userId;
        console.log(likeSong, 222)
        res = await LikeSongService.create(likeSong);
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
   * 取消 喜欢的歌曲
   * @id 歌曲ID
   */
  'PUT /api/likeSong/:id': async ctx => {
    if (await ctx.isNotLogin()) {
      return
    }
    const { id } = ctx.request.params;
    const userId = ctx.session.userId;
    const res = await LikeSongService.cancelLike(userId, id);
    if (res) {
      ctx.rest();
    } else {
      ctx.rest(null, 1, '失败');
    }
  }
};