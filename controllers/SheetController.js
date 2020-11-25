const SheetService = require('../service/SheetService');
const SongService = require('../service/SongService');
const { pageTable } = require('../rest');

module.exports = {
  /**
   * @description 根据标签名称查询所有歌单
   * @tagName 标签名称
   * @type 歌单类型 0：精选歌单，1：榜单，2：网友歌单
   */
  'GET /api/sheet/list': async ctx => {
    const { tagName, type, page, size } = ctx.request.query;
    let list = [], total = 0;
    if (tagName) {
      list = await SheetService.findAllByTagName({ tagName, type, page, size });
      const count = await SheetService.findAllCountByTagName(tagName, type);
      total = count.length;
    } else {
      list = await SheetService.findAll({ type, page, size });
      total = await SheetService.findAllCount(type);
    }
    const res = pageTable(list, page, size, total);
    if (res) {
      ctx.rest(res);
    } else {
      ctx.rest(null, 1, '失败');
    }
  },

  /**
   * @description 查询所有 排行榜歌单
   */
  'GET /api/sheet/toplist': async ctx => {
    const list = await SheetService.findAllTopList();
    for (let i = 0; i < 4; i++) {
      const sheet = list[i];
      const song = await SongService.findAllSongBySheetId({ sheetId: sheet.sheetId, page: 0, size: 10 });
      sheet.dataValues.songList = song;
    }
    if (list) {
      ctx.rest(list);
    } else {
      ctx.rest(null, 1, '失败');
    }
  },

  /**
   * @description 根据歌单 查询歌单信息以及所有歌曲
   * @id sheetId
   */
  'GET /api/sheet': async ctx => {
    const { id, page, size } = ctx.request.query;
    if (!id) {
      ctx.rest(null, 1, 'ID不能为空');
      return;
    }
    const sheet = await SheetService.findSheetById(id);
    const song = await SongService.findAllSongBySheetId({ sheetId: sheet.sheetId, page, size });
    sheet.dataValues.songList = song;
    if (sheet) {
      ctx.rest(sheet);
    } else {
      ctx.rest(null, 1, '失败');
    }
  }
};