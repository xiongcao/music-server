const model = require('../db/model');
const { Op } = require('sequelize');

const { Song, SQL } = model;

module.exports = {
  /**
   * @description 查询所有歌曲
   */
  findAll: async () => {
    return await Song.findAll();
  },

  /**
   * @description 根据专辑ID查询所有歌曲信息
   * @albumId 专辑ID
   */
  findAllSongByAlbumId: async (albumId) => {
    return await Song.findAll({
      where: { albumId }
    });
  },

  /**
   * @description 根据 歌单ID 查询前 N 条歌曲信息
   * @sheetId 专辑ID
   * @page 页码
   * @size 每页条数
   * @orderFileds 排序字段
   * @orderRules 排序规则
   */
  findAllSongBySheetId: async ({ sheetId, page = 0, size = 20, orderFileds = 'createdAt', orderRules = 'ASC' }) => {
    let sql = `
      SELECT * FROM song WHERE song_id IN (
        SELECT song_id FROM song_sheet_mapping WHERE sheet_id = :sheetId
      ) ORDER BY :orderFileds :orderRules  LIMIT :pageSize, :size ;`
    return await SQL.query(sql, {
      model: Song,
      mapToModel: true,
      replacements: {
        sheetId, orderFileds, orderRules, pageSize: page * size, size: Number(size)
      }
    })
  },

  /**
   * @description 搜索 歌曲信息
   * @name 歌曲名称
   */
  findAllPageByName: async ({ name, page = 0, size = 20 }) => {
    return await Song.findAll(
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
   * @description 搜索 歌曲信息 的总数量
   * @name 歌曲名称
   */
  findCountByName: async (name) => {
    return await Song.count(
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