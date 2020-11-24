const AlbumService = require('../service/AlbumService');
const SongService = require('../service/SongService');


module.exports = {
  // 查询歌手专辑
  'GET /api/album/list/:singerId': async ctx => {
    const { singerId } = ctx.request.params;
    const list = await AlbumService.findAllBySingerId(singerId);
    if (list) {
      ctx.rest(list);
    } else {
      ctx.rest(null, 1, '失败');
    }
  },
  // 根据ID查询专辑详细信息
  'GET /api/album/:id': async ctx => {
    const { id } = ctx.request.params;
    const songs = await SongService.findAllSongByAlbumId(id);
    if (songs) {
      ctx.rest(songs);
    } else {
      ctx.rest(null, 1, '失败');
    }
  },
};