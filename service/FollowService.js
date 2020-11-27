const model = require('../db/model');

const { Follow, Song, SQL } = model;

module.exports = {
  /**
   * @description 根据 用户ID 查询 所有 关注用户
   * @userId 用户ID
   */
  findAllFollw: async ({ userId, page = 0, size = 20 }) => {
    let sql = `
      SELECT * FROM follow AS f 
      INNER JOIN singer AS s ON f.singer_id = s.singer_id
      WHERE f.user_id = :userId  AND f.`
      + '`status` = 1 '
      + `LIMIT :pageSize, :size
    `;
    return await SQL.query(sql, {
      model: Song,
      mapToModel: true,
      replacements: {
        userId, pageSize: page * size, size: Number(size)
      }
    });
  },

  /**
   * @description 根据 用户ID 查询 所有 粉丝用户
   * @userId 用户ID
   */
  findAllFans: async ({ userId, page = 0, size = 20 }) => {
    let sql = `
      SELECT * FROM follow AS f 
      INNER JOIN singer AS s ON f.singer_id = s.singer_id
      WHERE f.singer_id = :userId  AND f.`
      + '`status` = 1 '
      + `LIMIT :pageSize, :size
    `;
    return await SQL.query(sql, {
      model: Song,
      mapToModel: true,
      replacements: {
        userId, pageSize: page * size, size: Number(size)
      }
    });
  },

  /**
   * @description 查询 单个 用户
   * @userId 用户ID
   * @singerId 被关注用户
   */
  findFollow: async (userId, singerId) => {
    return await Follow.findOne({
      where: { userId, singerId }
    });
  },

  /**
   * @description 添加 关注
   * @follow
   */
  create: async (follow) => {
    return await Follow.create(follow)
  },

  /**
   * @description 更新关注状态
   * @userId 用户ID
   * @singerId 被关注用户
   * @status 0：取消，1：正常
   */
  update: async (userId, singerId, status) => {
    return await Follow.update({ status }, {
      where: { userId, singerId }
    })
  },


}