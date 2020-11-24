const SingerService = require('../service/SingerService');
const { pageTable } = require('../rest');


module.exports = {
  // 查询歌手列表
  'GET /api/singer/list': async ctx => {
    const { typeId, page, size } = ctx.request.query;
    // 查询所有歌手
    const list = await SingerService.findAllPages({ typeId, page, size: Number(size) });
    const count = await SingerService.findAllCount();
    // 查询歌手总数
    const res = pageTable(list, page, size, count.length);
    if (res) {
      ctx.rest(res);
    } else {
      ctx.rest(null, 1, '失败');
    }
  },
  // 根据ID查询歌手
  'GET /api/singer/:id': async ctx => {
    const { id } = ctx.request.params;
    const res = await SingerService.findSingerById(id);
    if (res) {
      ctx.rest(res);
    } else {
      ctx.rest(null, 1, '失败');
    }
  },
};