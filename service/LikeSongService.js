const model = require('../db/model');

const { LikeSong, Song, SQL } = model;

module.exports = {
  /**
   * @description 根据 用户ID 查询 所有喜欢的歌曲
   * @userId 歌手ID
   */
  findAllPageByUserId: async ({ userId, page = 0, size = 20 }) => {
    let sql = `
      SELECT s.* FROM like_song AS l
      INNER JOIN song AS s ON l.song_id = s.song_id
      WHERE l.user_id = :userId  AND l.`
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
   * @description 查询喜欢的歌曲
   * @userId 歌手ID
   * @songId 歌曲ID
   */
  findByUserIdAndSongId: async (userId, songId) => {
    return await LikeSong.findOne({
      where: { userId, songId }
    });
  },

  /**
   * @description 添加
   * @likeSong
   */
  create: async (likeSong) => {
    return await LikeSong.create(likeSong)
  },

  /**
   * @description 添加喜欢
   * @id 主键ID
   */
  addlLike: async (id) => {
    return await LikeSong.update({ status: 1 }, {
      where: { id }
    })
  },

  /**
   * @description 取消喜欢
   * @songId 歌曲ID
   */
  cancelLike: async (userId, songId) => {
    console.log(userId, songId)
    return await LikeSong.update({ status: 0 }, {
      where: { userId, songId }
    })
  },

  /**
   * @description 删除
   * @id 主键ID
   */
  deleteById: async (id) => {
    return await LikeSong.destroy({ where: { id } });
  },
}