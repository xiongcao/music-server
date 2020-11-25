const SongService = require('../service/SongService');
const AlbumService = require('../service/AlbumService')
const SingerService = require('../service/SingerService')
const SheetService = require('../service/SheetService')
const { pageTable } = require('../rest');


module.exports = {
  'GET /api/search': async ctx => {
    const { keyword, type, page, size } = ctx.request.query;
    if (!keyword) {
      ctx.rest(null, 1, 'keyword不能为空');
      return;
    }
    if (!type) {
      ctx.rest(null, 1, '搜索类型不能为空');
      return;
    }
    let list = [], count = 0;
    switch (type) {
      case '1': // 歌曲
        list = await SongService.findAllPageByName({ name: keyword, page, size });
        count = await SongService.findCountByName(keyword);
        break;
        case '2': // 专辑
        list = await AlbumService.findAllPageByName({ name: keyword, page, size });
        count = await AlbumService.findCountByName(keyword);
        break;
        case '3': // 歌手
        list = await SingerService.findAllPageByName({ name: keyword, page, size });
        count = await SingerService.findCountByName(keyword);
        break;
        case '4': // 歌单
        list = await SheetService.findAllPageByName({ name: keyword, page, size });
        count = await SheetService.findCountByName(keyword);
        break;
        default: // 歌曲
        list = await SongService.findAllPageByName({ name: keyword, page, size });
        count = await SongService.findCountByName(keyword);
        break
    }
    const res = pageTable(list, page, size, count);
    ctx.rest(res);
  }
};