const SheetService = require('../service/SheetService');
const { pageTable } = require('../rest');

module.exports = {
  /**
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
  }
};