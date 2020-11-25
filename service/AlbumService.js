const model = require('../db/model');
const { Op } = require('sequelize');

const { Album, SQL } = model;

module.exports = {
  /**
   * @description 根据歌手ID查询歌手的所有专辑
   * @singerId 歌手ID
   */
  findAllBySingerId: async (singerId) => {
    // 查询所有歌手
    let sql = `
    SELECT a.* FROM singer AS s
    INNER JOIN album AS a ON s.singer_id = a.singer_id
    WHERE s.singer_id = ?`;

    const list = await SQL.query(sql, {
      model: Album,
      mapToModel: true,
      replacements: [singerId]
    });
    return list;
  },
  
  /**
   * @description 根据ID查询专辑信息
   * @albumId 专辑ID
   */
  findAlbumByAlbumId: async (albumId) => {
    return await Album.findOne({
      where: { albumId }
    });
  },

  /**
   * @description 搜索 专辑信息
   * @name 专辑名称
   */
  findAllPageByName: async ({ name, page = 0, size = 20 }) => {
    return await Album.findAll(
      {
        offset: page * size, limit: size,
        where: {
          name: {
            [Op.like]: '%' + name + '%'
          }
        }
      }
    );
  },

   /**
   * @description 搜索 专辑信息 的总数量
   * @name 专辑名称
   */
  findCountByName: async (name) => {
    return await Album.count(
      {
        where: {
          name: {
            [Op.like]: '%' + name + '%'
          }
        }
      }
    );
  },
}