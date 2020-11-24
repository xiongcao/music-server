const model = require('../db/model');
const { QueryTypes } = require('sequelize');

const { Singer, SQL } = model;

module.exports = {
  /**
   * @description 根据条件，分页查询，所有歌手信息（歌手为singer_type_mapping中的singer_id）
   * @typeId 歌手类型，如：华语，欧美、日本
   * @nickname 歌手名称
   * @page 页码
   * @size 每页条数
   * @orderFileds 排序字段
   * @orderRules 排序规则
   */
  findAllPages: async ({ typeId = '', nickname = '', page = 0, size = 50, orderFileds = 'createdAt', orderRules = 'ASC' }) => {
    // 查询所有歌手
    let sql = `
      SELECT * FROM singer AS s 
      INNER JOIN singer_type_mapping AS stm ON s.singer_id = stm.singer_id
      WHERE `;

    // 下面两个条件不能同时出现
    if (typeId) {
      sql += `stm.type_id = :typeId `
    }

    if (nickname) {
      sql += `s.nickname LIKE '%${nickname}%' `
    }

    sql += `
    ORDER BY :orderFileds :orderRules 
    LIMIT :pageSize, :size`;
    const list = await SQL.query(sql, {
      model: Singer,
      mapToModel: true,
      replacements: {
        typeId, orderFileds, orderRules, pageSize: page * size, size
      }
    });
    return list;
  },
  /**
   * @description 查询歌手总数
   */
  findAllCount: async () => {
    return await SQL.query('SELECT singer_id, COUNT(*) FROM singer_type_mapping GROUP BY singer_id;', {
      type: QueryTypes.SELECT
    });
  },
  /**
   * @description 根据ID查询歌手信息
   * @id 歌手ID
   */
  findSingerById: async (id) => {
    return await Singer.findOne({
      where: { id }
    });
  }
}