const SingerTypeService = require('../service/SingerTypeService');

module.exports = {
  // 查询列表类型
  'GET /api/singerType/list': async ctx => {
    const type = await SingerTypeService.findOneLevelAll();
    if (type) {
      ctx.rest(type);
    } else {
      ctx.rest(null, 1, '失败');
    }
  },
  // 查询全部列表类型
  'GET /api/singerType/admin/list': async ctx => {
    const type = await SingerTypeService.findAll();
    if (type) {
      ctx.rest(type);
    } else {
      ctx.rest(null, 1, '失败');
    }
  },
  // 添加类型
  'POST /api/singerType': async ctx => {
    const type = await SingerTypeService.create(ctx.request.body);
    if (type) {
      ctx.rest();
    } else {
      ctx.rest(null, 1, '失败');
    }
  },
  // 根据ID查找类型
  'GET /api/singerType/:id': async ctx => {
    const { id } = ctx.request.params;
    const type = await SingerTypeService.findTypeById(id);
    if (type) {
      ctx.rest(type);
    } else {
      ctx.rest(null, 1, '失败');
    }
  },
  // 根据ID删除歌手类型
  'DELETE /api/singerType/:id/:status': async ctx => {
    const { id, status } = ctx.request.params;
    const type = await SingerTypeService.updateStatusById(id, status)
    if (type) {
      ctx.rest();
    } else {
      ctx.rest(null, 1, '失败');
    }
  }
};