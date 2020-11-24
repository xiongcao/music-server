const TagService = require('../service/TagService');
const AlbumService = require('../service/TagService');

module.exports = {
  'GET /api/tag/list': async ctx => {
    const list = await TagService.findAllCategoryAndTag();
    if (list) {
      ctx.rest(list);
    } else {
      ctx.rest(null, 1, '失败');
    }
  }
};