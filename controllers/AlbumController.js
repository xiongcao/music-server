const AlbumService = require('../service/AlbumService');
const SongService = require('../service/SongService');


module.exports = {
  // 查询歌手专辑
  'GET /api/album/list/:singerId': async ctx => {
    const { singerId } = ctx.request.params;
    if (!singerId) {
      ctx.rest(null, 1, '歌手ID不可为空');
      return
    }
    const list = await AlbumService.findAllBySingerId(singerId);
    if (list) {
      ctx.rest(list);
    } else {
      ctx.rest(null, 1, '失败');
    }
  },
  
  // 根据ID查询专辑 所有 歌曲信息 ,id => albumId
  'GET /api/album/:id': async ctx => {
    const { id } = ctx.request.params;
    if (!id) {
      ctx.rest(null, 1, '专辑ID不可为空');
      return
    }
    const album = await AlbumService.findAlbumByAlbumId(id);
    if (!album) {
      ctx.rest(null, 1, '没有找到');
      return
    }
    const songs = await SongService.findAllSongByAlbumId(id);
    album.dataValues.songList = songs;
    if (album) {
      ctx.rest(album);
    } else {
      ctx.rest(null, 1, '失败');
    }
  },
};