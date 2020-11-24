const model = require('../db/model');

const { Sheet, SQL } = model;

module.exports = {
  /**
   * @description 根据标签名称查询所有歌单
   * @tagName 标签名
   * @type 歌单类型 0：精选歌单，1：榜单，2：网友歌单
   * @page 页码
   * @size 每页条数
   * @orderFileds 排序字段
   * @orderRules 排序规则
   */
  findAllByTagName: async ({ tagName, type, page = 0, size = 20, orderFileds = 'createdAt', orderRules = 'ASC' }) => {
    let sql = `
      SELECT s.* FROM tag as t 
      INNER JOIN tag_sheet_mapping AS tsm ON t.id = tsm.tag_id 
      INNER JOIN sheet AS s ON s.sheet_id = tsm.sheet_id 
    `;

    if (tagName) {
      sql += 'WHERE t.`name` = :tagName ';
    }

    if (type) {
      sql += ` AND s.type = :type `;
    }

    sql += `
      ORDER BY :orderFileds :orderRules 
      LIMIT :pageSize, :size `;

    const list = await SQL.query(sql, {
      model: Sheet,
      mapToModel: true,
      replacements: {
        tagName, type, orderFileds, orderRules, pageSize: page * size, size: Number(size)
      }
    });
    return list;
  },
  /**
   * @description 查询所有歌手
   * @type 歌单类型 0：精选歌单，1：榜单，2：网友歌单
   */
  findAll: async ({ type, page = 0, size = 20, orderFileds = 'createdAt', orderRules = 'ASC' }) => {
    const query = {
      limit: size,
      offset: page * size,
      order: [
        [orderFileds, orderRules]
      ]
    }
    if (type || type == 0) {
      query.where = { type }
    }
    return await Sheet.findAll(query);
  },
  /**
   * @description 查询歌单数量
   * @type 歌单类型 0：精选歌单，1：榜单，2：网友歌单
   */
  findAllCount: async (type) => {
    const query = {};
    if (type || type == 0) {
      query.where = { type }
    }
    return await Sheet.count(query);
  },
  /**
   * @description 根据标签名查询歌单总数
   * @type 歌单类型 0：精选歌单，1：榜单，2：网友歌单
   * @tagName 标签名
   */
  findAllCountByTagName: async (tagName, type) => {
    let sql = `
      SELECT s.* FROM tag as t 
      INNER JOIN tag_sheet_mapping AS tsm ON t.id = tsm.tag_id 
      INNER JOIN sheet AS s ON s.sheet_id = tsm.sheet_id 
    `;
    sql += 'WHERE t.`name` = :tagName ';
    if (type) {
      sql += ` AND s.type = :type `;
    }
    const list = await SQL.query(sql, {
      model: Sheet,
      mapToModel: true,
      replacements: {
        tagName, type
      }
    });
    return list;
  },
}