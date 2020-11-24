const model = require('../db/model');

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
   * @id 专辑ID
   */
  findAlbumById: async (id) => {
    return await Album.findOne({
      where: { id }
    });
  }
}